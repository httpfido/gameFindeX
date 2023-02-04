import { getGenres, getPlatform } from "../../redux/actions";
import { useForm } from "../../components/hooks/useForm.jsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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

  // me traigo del objeto global los generos y plataformas
  const gen = useSelector((state) => state.copyOfGenres);
  const platf = useSelector((state) => state.copyOfPlatform);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const validateField = (field) => {
    switch (field) {
      case "released":
        if (!form.released.trim())
          setErrors({ ...errors, released: "Released date is required" });
        else if (form.released.trim()) delete errors.released;
        break;

      case "name":
        if (!form.name.trim())
          setErrors({ ...errors, name: "Name date is required" });
        if (form.name.trim()) delete errors.name;
        break;

      case "description":
        if (!form.description.trim())
          setErrors({ ...errors, description: "A description is required" });
        if (form.description.trim()) delete errors.description;
        break;

      case "platform":
        if (!form.platforms)
          setErrors({
            ...errors,
            platform: "At least one platform must be selectioned",
          });
        if (form.platforms) delete errors.platform;
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateField(form));

    if (!Object.keys(errors).length) setLoading(true);
  };

  //   // handler para enviar el post al back
  //   const submitHandler = (event) => {
  //     event.preventDefault();
  //     axios.post("http://localhost:3001/videogames", form);
  //   };

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
      <form onSubmit={handleSubmit} className={style.formContainer}>
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
            required
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
            required
          />

          {errors.description && (
            <p className={style.error}>{errors.description}</p>
          )}
        </div>

        <div className={style.inputContainer}>
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
                {element}
                <button
                  value={element}
                  className={style.x}
                  onClick={handleDeleteG}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <input
          className={style.input}
          type="text"
          value={form.background_image}
          onChange={handleChange}
          onBlur={() => validateField("img")}
          name="background_image"
          placeholder="Imagen"
        />

        <input
          className={style.input}
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
        <div className={style.inputContainer}>
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
          {errors.platforms && (
            <p className={style.error}>{errors.platforms}</p>
          )}
          <div className={style.selected}>
            {form.platforms?.map((element, index) => (
              <span key={index}>
                {element}
                <button value={element} onClick={handleDeleteP}>
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <button className={style.submit} type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

// const Form = () => {
//   // como primera instancia, le ordeno al reducer que haga la peticion a la api, tanto de generos como de plataformas, y los meta
//   // en el objeto global
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getGenres());
//     dispatch(getPlatform());
//   }, [dispatch]);

//   const [error, setError] = useState({

//   });

//   // ahora, declaro estado local con valor inicial un objeto con atributes IDENTICOS (importante) a lo que espera el back
//   const [form, setForm] = useState({
//     name: "",
//     background_image: "",
//     description: "",
//     genres: [],
//     released: "",
//     rating: "",
//     platforms: [],
//   });

//   function validate(form) {

//     if (!form.name) {
//       error.name = "Name is required";
//     } else if (form.name.length > 50) {
//       error.name = "Name is too long";
//     }

//     if (!form.description) {
//       error.description = "Description is required ";
//     } else if (form.description.length > 1500) {
//       error.description = "Description is too long. (Max = 1500 characters)";
//     }

//     if (!form.rating) {
//       error.rating = "Rating is required";
//     } else if (form.rating > 5 || form.rating < 0) {
//       error.rating = "Rating must range between 0 to 5";
//     }

//     if (!form.released) {
//       error.released = "Date of release is required";
//     } else if (form.released.length < 10) {
//       error.released = "Date of release is to long";
//     }
//     if (!form.image) {
//       error.image = "Image URL is required";
//     }

//     if (!form.genres.length) {
//       error.genre = "Minimun one Genre is required ";
//     }

//     // if (!form.platform[0]) {
//     //   error.platforms = "Minimun one Platform is required";
//     // }
//     console.log(error);
//     return error;
//   }

//   // HANDLERS PARA INPUTS
//   // handler para controlar que lo que escribo en el input, se modifique en el state
//   const changeHandler = (event) => {
//     const property = event.target.name;
//     const value = event.target.value;

//     setForm({ ...form, [property]: value });
//     setError(validate({ ...form, [property]: value }));
//   };

//   // handler para enviar el post al back
//   const submitHandler = (event) => {
//     event.preventDefault();
//     axios.post("http://localhost:3001/videogames", form);
//   };

//   // HANDLERS PARA MENUS DESPLEGABLES
//   // platforms: agrega
//   function handleSelectP(event) {
//     if (
//       event.target.value !== "platforms" &&
//       !form.platforms.includes(event.target.value)
//     )
//       setForm({
//         ...form,
//         platforms: [...form.platforms, event.target.value],
//       });
//   }

//   // platforms: borra
//   function handleDeleteP(event) {
//     setForm({
//       ...form,
//       platforms: form.platforms.filter(
//         (element) => element !== event.target.value
//       ),
//     });
//   }

//   // genero: agrega
//   function handleSelectG(event) {
//     if (
//       event.target.value !== "platforms" &&
//       !form.genres.includes(event.target.value)
//     )
//       setForm({
//         ...form,
//         genres: [...form.genres, event.target.value],
//       });
//   }

//   // genero: borra
//   function handleDeleteG(event) {
//     setForm({
//       ...form,
//       genres: form.genres.filter((element) => element !== event.target.value),
//     });
//   }

//   return (
//     <div className={style.mainContainer}>
//       <form onSubmit={submitHandler} className={style.formContainer}>
//         <div>
//           <input
//             className={style.input}
//             type="text"
//             value={form.name}
//             onChange={changeHandler}
//             name="name"
//             placeholder="Name"
//           />
//           {error.name && <h1 className={style.error}>{error.name}</h1>}
//         </div>

//         <div>
//           <input
//             className={style.input}
//             type="text"
//             value={form.description}
//             onChange={changeHandler}
//             name="description"
//             placeholder="Description"
//           />
//           {/* {error.name && <h1>{error.name}</h1>} */}
//         </div>

//         <select className={style.select} name="genres" onChange={handleSelectG}>
//           <option value="genres" className={style.genres}>
//             Genres
//           </option>
//           {gen?.map((element, index) => (
//             <option key={index} className={style.selectGenre}>
//               {element}
//             </option>
//           ))}
//         </select>
//         {/* {error.name && <h1>{error.name}</h1>} */}
//         <div className={style.selected}>
//           {form.genres?.map((element, index) => (
//             <span key={index}>
//               {element}
//               <button
//                 value={element}
//                 className={style.x}
//                 onClick={handleDeleteG}
//               >
//                 X
//               </button>
//             </span>
//           ))}
//         </div>

//         <div>
//           <input
//             className={style.input}
//             type="text"
//             value={form.released}
//             onChange={changeHandler}
//             name="released"
//             placeholder="Released"
//           />
//         </div>

//         <div>
//           <input
//             className={style.input}
//             type="number"
//             value={form.rating}
//             onChange={changeHandler}
//             name="rating"
//             placeholder="Rating"
//             min="0.25"
//             max="5"
//             step="0.25"
//           />
//         </div>

//         <select
//           className={style.select}
//           name="platforms"
//           onChange={handleSelectP}
//         >
//           <option value="platforms" className={style.genres}>
//             Platforms
//           </option>
//           {platf?.map((element, index) => (
//             <option key={index}>{element}</option>
//           ))}
//         </select>
//         <div className={style.selected}>
//           {form.platforms?.map((element, index) => (
//             <span key={index}>
//               {element}
//               <button value={element} onClick={handleDeleteP}>
//                 X
//               </button>
//             </span>
//           ))}
//         </div>

//         <div>
//           <input
//             className={style.input}
//             type="text"
//             value={form.background_image}
//             onChange={changeHandler}
//             name="background_image"
//             placeholder="Imagen"
//           />
//         </div>

//         <button className={style.submit} type="submit">
//           SUBMIT
//         </button>
//       </form>
//     </div>
//   );
// };

export default Form;
