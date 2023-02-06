import { getGenres, getPlatform } from "../../redux/actions";
import { useForm } from "../../components/hooks/useForm.jsx";
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
      case "released":
        if (!form.released.trim())
          setErrors({ ...errors, released: "Released date is required" });
        else if (form.released.trim()) delete errors.released;
        break;

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

    }
  };

  const validateSelected = () => {
    setErrors({
      ...errors,
      platforms: "At least one platform must be selectioned",
    });
  if (form.platforms.length) delete errors.platforms;

    if(!form.genres.length){
      setErrors({
        ...errors,
        genres: "At least one genre must be selectioned",
      });
    if (form.genres.length) delete errors.genres;
    }
  }

  const handleChange = (e) => {
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
      }, 2300);
      return;
    }
    if (!form.platforms.includes(event.target.value)) {
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
      }, 2300);
      return;
    }
    if (!form.genres.includes(event.target.value)) {
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

    if (!form.name || !form.description || !form.platforms.length){
      setLoading(false)
      return setIncomplete(true);
    }
    if (Object.keys(errors).length) {
      setLoading(false)
      return setIncomplete(true);
    }

    if (!Object.keys(errors).length) setLoading(true);
    axios
      .post("http://localhost:3001/videogames", form)
      .then((res) => setLoading(false));
  };

  //   // handler para enviar el post al back
  //   const submitHandler = (event) => {
  //     event.preventDefault();
  //     axios.post("http://localhost:3001/videogames", form);
  //   };
  return (
    <div className={style.mainContainer}>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        <h1 className={style.title}>Add a new game to the list!</h1>
        {/* <div className={style.nameReleased}>
            </div> */}
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
          {errors.released && <p className={style.error}>{errors.released}</p>}
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

          {errors.genres && <p className={style.error}>{errors.genres}</p>}

          <div className={style.selected}>
            {form.genres?.map((element, index) => (
              <span key={index}>
                <button
                  value={element}
                  className={style.x}
                  onClick={handleDeleteG}
                >
                  {element}
                </button>
              </span>
            ))}
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
            onBlur={() => validateField("rating")}
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
            onClick={() => {
              validateField("platforms");
            }}
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
                  onClick={handleDeleteP}
                  className={style.x}
                >
                  {element}
                </button>
              </span>
            ))}
            {errors.platforms && <p className={style.error}>{errors.platforms}</p>}
            {/* {errors.platforms && <p className={style.error}>{errors.platforms}</p>} */}
            {max.platforms && <p className={style.max}>Max 8 platforms</p>}
          </div>
        </div>
        <div className={style.submitContainer}>
          {!loading && (
            <button className={style.submit} type="submit">
              SUBMIT
            </button>
          )}
          {incomplete && <p className={style.error}>There is incompleted fields</p>}
          {loading && <Circle />}
        </div>
      </form>
    </div>
  );
};

export default Form;