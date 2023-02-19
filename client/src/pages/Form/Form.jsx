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
  rating: "0.25",
  platform: [],
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
    platform: false,
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
        if (!form.platform.length) {
          newErrors.platform = "At least one platform must be selectioned";
        }
        if (!form.platform.length) {
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
      if (!form.platform.length) {
        setErrors({
          ...errors,
          platform: "At least one platform must be selectioned",
        });
      }

      if (form.platform.length) delete errors.platform;
      if (form.genres.length) delete errors.genres;
    } else {
      setErrors({
        ...errors,
        genres: "At least one genre must be selectioned",
        platform: "At least one platform must be selectioned",
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

  // platform: agrega
  function handleSelectP(event) {
    if (form.platform.length >= 8) {
      setMax({ ...max, platform: true });
      setTimeout(() => {
        setMax({ ...max, platform: false });
      }, 2900);
      return;
    }
    if (event.target.value === "Platform") return;
    if (!form.platform.includes(event.target.value)) {
      if (errors.platform && errors.platform.length) delete errors.platform;
      setForm({
        ...form,
        platform: [...form.platform, event.target.value],
      });
    }
  }

  // platform: borra
  function handleDeleteP(event) {
    setForm({
      ...form,
      platform: form.platform.filter(
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
      !form.platform.length ||
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
      .post("/videogames", form)
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
            name="platform"
            onChange={handleSelectP}
          >
            <option value="platform" className={style.genres}>
              Platform
            </option>
            {platf?.map((element, index) => (
              <option key={index}>{element}</option>
            ))}
          </select>
          <div className={style.selected}>
            {form.platform?.map((element, index) => (
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
            {errors.platform && (
              <p className={style.errorP}>{errors.platform}</p>
            )}
            {max.platform && <p className={style.max}>Max 8 platform</p>}
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
