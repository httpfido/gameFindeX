
import { getGenres, getPlatform } from "../../redux/actions";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import style from "./Form.module.css";

const Form = () => {
  // como primera instancia, le ordeno al reducer que haga la peticion a la api, tanto de generos como de plataformas, y los meta
  // en el objeto global
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatform());
  }, [dispatch]);

  // ahora, declaro estado local con valor inicial un objeto con atributes IDENTICOS (importante) a lo que espera el back
  const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    genres: [],
    released: "",
    rating: "",
    platforms: [],
  });

  // ahora me traigo del objeto global los generos y plataformas
  const gen = useSelector((state) => state.copyOfGenres);
  const platf = useSelector((state) => state.copyOfPlatform);

  // HANDLERS PARA INPUTS
  // handler para controlar que lo que escribo en el input, se modifique en el state
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  // handler para enviar el post al back
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/videogames", form);
  };

  // HANDLERS PARA MENUS DESPLEGABLES
  // platforms: agrega
  function handleSelectP(event) {
    if (
      event.target.value !== "platforms" &&
      !form.platforms.includes(event.target.value)
    )
      setForm({
        ...form,
        platforms: [...form.platforms, event.target.value],
      });
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
    if (
      event.target.value !== "platforms" &&
      !form.genres.includes(event.target.value)
    )
      setForm({
        ...form,
        genres: [...form.genres, event.target.value],
      });
  }

  // genero: borra
  function handleDeleteG(event) {
    setForm({
      ...form,
      genres: form.genres.filter((element) => element !== event.target.value),
    });
  }

  return (
    <div className={style.mainContainer}>


      <form onSubmit={submitHandler} className={style.formContainer}>
        <div>
          <input
            className={style.input}
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
            placeholder="Name"
          />
        </div>

        <div>
          <input
            className={style.input}
            type="text"
            value={form.description}
            onChange={changeHandler}
            name="description"
            placeholder="Description"
          />
        </div>

        <select className={style.select} name="genres" onChange={handleSelectG}>
          <option value="genres" className={style.genres}>
            Genres
          </option>
          {gen?.map((element, index) => (
            <option key={index} className={style.selectGenre}>{element}</option>
          ))}
        </select>
        <div className={style.selected}>
          {form.genres?.map((element, index) => (
            <span key={index}>
              {element}
              <button value={element} className={style.x} onClick={handleDeleteG}>
                X
              </button>
            </span>
          ))}
        </div>

        <div>
          <input
            className={style.input}
            type="text"
            value={form.released}
            onChange={changeHandler}
            name="released"
            placeholder="Released"
          />
        </div>

        <div>
          <input
            className={style.input}
            type="text"
            value={form.rating}
            onChange={changeHandler}
            name="rating"
            placeholder="Rating"
          />
        </div>

        <select className={style.select} name="platforms" onChange={handleSelectP}>
          <option value="platforms" className={style.genres}>
            Platforms
          </option>
          {platf?.map((element, index) => (
            <option key={index}>{element}</option>
          ))}
        </select>
        <div className={style.selected}>
          {form.platforms?.map((element, index) => (
            <span key={index} >
              {element}
              <button value={element} onClick={handleDeleteP}>
                X
              </button>
            </span>
          ))}
        </div>

        <div>
          <input
            className={style.input}
            type="text"
            value={form.background_image}
            onChange={changeHandler}
            name="background_image"
            placeholder="Imagen"
          />
        </div>

        <button className={style.submit} type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Form;
