import { getGenres, getPlatform } from "../../redux/actions";
import Circle from "../../components/Loader/Circle";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import style from "./Form.module.css";

const initialForm = {
  name: "",
  background_image: "",
  description: "",
  genres: [],
  released: "",
  rating: "",
  platforms: [],
};

// * * * * * * * * * * * DE ACA PARA ATRAS FUNCIONA * * * * * * * * * * * * * * * * * * * *

const Form = () => {
  //   // como primera instancia, le ordeno al reducer que haga la peticion a la api, tanto de generos como de plataformas, y los meta
  //   // en el objeto global
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatform());
  }, [dispatch]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // me traigo del objeto global los generos y plataformas
  const gen = useSelector((state) => state.copyOfGenres);
  const platf = useSelector((state) => state.copyOfPlatform);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [max, setMax] = useState({
    genres: false,
    platforms: false,
  });
  const [loading, setLoading] = useState(false);
  const [incomplete, setIncomplete] = useState(false);

  const validateField = (field) => {
    switch (field) {
      case "name":
        if (!form.name.trim())
          setErrors({ ...errors, name: "A name is required" });
        if (form.name.trim()) delete errors.name;
        break;

      case "description":
        if (!form.description.trim())
          setErrors({ ...errors, description: "A description is required" });
        if (form.description.trim()) delete errors.description;
        break;

      default:
        const newErrors = {};

        if (!form.description) {
          newErrors.description = "A description is required";
        }
        if (!form.name) {
          newErrors.name = "A name is required";
        }
        if (!form.platforms.length) {
          newErrors.platforms = "At least one platform must be selectioned";
        }
        if (!form.platforms.length) {
          newErrors.genres = "At least one genre must be selectioned";
        }

        setErrors({
          ...errors,
          ...newErrors,
        });

        break;
    }
  };

  const validateSelected = () => {
    if (!form.genres.length) {
      setErrors({
        ...errors,
        genres: "At least one genre must be selectioned",
      });
      if (!form.platforms.length) {
        setErrors({
          ...errors,
          platforms: "At least one platform must be selectioned",
        });
      }

      if (form.platforms.length) delete errors.platforms;
      if (form.genres.length) delete errors.genres;
    } else {
      setErrors({
        ...errors,
        genres: "At least one genre must be selectioned",
        platforms: "At least one platform must be selectioned",
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setIncomplete(false);
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (errors[name]) {
      delete errors[name];
    }
  };

  // HANDLERS PARA MENUS DESPLEGABLES

  // platforms: agrega
  function handleSelectP(event) {
    if (form.platforms.length >= 8) {
      setMax({ ...max, platforms: true });
      setTimeout(() => {
        setMax({ ...max, platforms: false });
      }, 2900);
      return;
    }
    if (event.target.value === "Platforms") return;
    if (!form.platforms.includes(event.target.value)) {
      if (errors.platforms && errors.platforms.length) delete errors.platforms;
      setForm({
        ...form,
        platforms: [...form.platforms, event.target.value],
      });
    }
  }

  // platforms: borra
  function handleDeleteP(event) {
    setForm({
      ...form,
      platforms: form.platforms.filter(
        (element) => element !== event.target.value
      ),
    });
  }

  // genero: agrega
  function handleSelectG(event) {
    if (form.genres.length >= 4) {
      setMax({ ...max, genres: true });
      setTimeout(() => {
        setMax({ ...max, genres: false });
      }, 2900);
      return;
    }
    if (event.target.value === "Genres") return;
    if (!form.genres.includes(event.target.value)) {
      if (errors.genres && errors.genres.length) delete errors.genres;
      setForm({
        ...form,
        genres: [...form.genres, event.target.value],
      });
    }
  }

  // genero: borra
  function handleDeleteG(event) {
    setForm({
      ...form,
      genres: form.genres.filter((element) => element !== event.target.value),
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validateSelected();
    validateField();

    if (
      !form.name ||
      !form.description ||
      !form.platforms.length ||
      !form.genres.length
    ) {
      setLoading(false);
      return setIncomplete(true);
    }
    if (Object.keys(errors).length) {
      setLoading(false);
      return setIncomplete(true);
    }

    if (!Object.keys(errors).length) setLoading(true);
    axios
      .post("http://localhost:3001/videogames", form)
      .then((res) => setLoading(false));
  };

  return (
    <div className={style.mainContainer}>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        <h1 className={style.title}>Add a new game to the list!</h1>

        <div className={style.inputContainer}>
          <input
            className={style.input}
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={() => validateField("name")}
            placeholder="Name"
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
        </div>

        <div className={style.inputContainer}>
          <input
            className={style.input}
            type="text"
            value={form.released}
            onChange={handleChange}
            name="released"
            placeholder="Released"
          />
        </div>

        <div className={style.descriptionContainer}>
          <textarea
            className={style.description}
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            onBlur={() => validateField("description")}
            placeholder="Description"
          />

          {errors.description && (
            <p className={style.error}>{errors.description}</p>
          )}
        </div>

        <div className={style.selectContainer}>
          <select
            className={style.select}
            name="genres"
            onChange={handleSelectG}
          >
            <option value="genres" className={style.genres}>
              Genres
            </option>
            {gen?.map((element, index) => (
              <option key={index} className={style.selectGenre}>
                {element}
              </option>
            ))}
          </select>
          <div className={style.selected}>
            {form.genres?.map((element, index) => (
              <span key={index}>
                <button
                  value={element}
                  type="button"
                  className={style.x}
                  onClick={handleDeleteG}
                >
                  {element}
                </button>
              </span>
            ))}
            {errors.genres && <p className={style.errorG}>{errors.genres}</p>}
            {max.genres && <p className={style.max}>Max 4 genres</p>}
          </div>
        </div>

        <div className={style.inputContainer}>
          <input
            className={style.input}
            type="text"
            value={form.background_image}
            onChange={handleChange}
            onBlur={() => validateField("img")}
            name="background_image"
            placeholder="Imagen"
          />
        </div>

        <div className={style.inputContainer}>
          <input
            className={style.rating}
            type="number"
            value={form.rating}
            onChange={handleChange}
            name="rating"
            placeholder="Rating"
            min="0.25"
            max="5"
            step="0.25"
          />
        </div>

        <div className={style.selectContainer}>
          <select
            className={style.select}
            name="platforms"
            onChange={handleSelectP}
          >
            <option value="platforms" className={style.genres}>
              Platforms
            </option>
            {platf?.map((element, index) => (
              <option key={index}>{element}</option>
            ))}
          </select>
          <div className={style.selected}>
            {form.platforms?.map((element, index) => (
              <span key={index}>
                <button
                  value={element}
                  type="button"
                  onClick={handleDeleteP}
                  className={style.x}
                >
                  {element}
                </button>
              </span>
            ))}
            {errors.platforms && (
              <p className={style.errorP}>{errors.platforms}</p>
            )}
            {max.platforms && <p className={style.max}>Max 8 platforms</p>}
          </div>
        </div>
        <div className={style.submitContainer}>
          {!loading && (
            <button className={style.submit} type="submit">
              SUBMIT
            </button>
          )}
          {incomplete && (
            <p className={style.error}>There is incompleted fields</p>
          )}
          {loading && <Circle />}
        </div>
      </form>
    </div>
  );
};

export default Form;
