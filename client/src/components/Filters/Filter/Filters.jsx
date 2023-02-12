import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getGames,
  filterByGenre,
  filterByRating,
  filterByAbc,
  filterCreated,
  getGenres,
  resetPage,
  setPage,
} from "../../../redux/actions";
import style from "./Filters.module.css";

export default function Filters({ setCurrentPage, setOrden }) {
  // const [byGenre, setByGenre] = useState();
  const dispatch = useDispatch();
  const myGenres = useSelector((state) => state.copyOfGenres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [source, setSource] = useState([]);

  function handleFilterByGenre(e) {
    e.preventDefault();
    if (e.target.value !== "all" && source.length <= 3) {
      setSource((prevSource) => [...prevSource, e.target.value]);
      console.log(source.length);
    }
  }

  function handleDeleteG(e) {
    setSource(source.filter((element) => element !== e.target.value));
    dispatch(filterByGenre(source));
  }
  
  useEffect(() => {
    console.log(source);
    dispatch(filterByGenre(source));
      dispatch(resetPage());
  }, [source, dispatch]);
  // setSource((prevSource) => prevSource.filter((element) => element !== e.target.value));

  // function handleFilterByRating(e) {
  //   e.preventDefault();
  //   e.target.value === "all"
  //     ? dispatch(getGames) && setOrden(`Rating ${e.target.value}`)
  //     : dispatch(filterByRating(e.target.value));
  //   setOrden(`Rating ${e.target.value}`);
  // }

  // function handleFilterByAbc(e) {
  //   e.preventDefault();
  //   e.target.value === "all"
  //     ? dispatch(filterByAbc) && setOrden(`ABC ${e.target.value}`)
  //     : dispatch(filterByAbc(e.target.value));
  //   setOrden(`ABC ${e.target.value}`);
  //   dispatch(resetPage());
  // }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    dispatch(resetPage());
  }

  return (
    <div className={style.filters}>
      <div className={style.filterContainer}>
        <h5 className={style.underline}>Filters</h5>

        <div className={style.aligns}>
          <p className={style.title}>Genres:</p>
          <select
            className={style.options}
            onChange={(e) => handleFilterByGenre(e)}
          >
            <option value="all">Genres</option>
            {myGenres?.map((element, index) => (
              <option key={index}>{element}</option>
            ))}
          </select>
          <div className={source.length? style.selected : style.hidden}>
          {source?.map((element, index) => (
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
          </div>
        </div>
      </div>

      <div className={style.sortingContainer}>
        <h5 className={style.underline}>Sorting</h5>
        <div className={style.aligns}>
          <p>Storage:</p>
          <select
            className={style.options}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option value="all">All</option>
            <option value="lb">Library</option>
            <option value="db">Created in DB</option>
          </select>
        </div>
      </div>

      <div className={style.sortingContainer}>
        <h5 className={style.underline}>Sorting</h5>
        {/* <div className={style.aligns}>
          <p>Rating:</p>
          <select className={style.options} onChange={(e) => handleFilterByRating(e)}>
            <option value="all">All</option>
            <option value="asc">Rating Asc</option>
            <option value="desc">Rating Desc</option>
          </select>
        </div> */}
        {/* <h5 className={style.underline}>Alphabetical Order:</h5>
        <select className={style.options} onChange={(e) => handleFilterByAbc(e)}>
          <option value="all">All</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select> */}
      </div>
    </div>
  );
}

// import style from "./Filter.module.css";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getGames } from "../../../redux/actions";

// const Filters = () => {

//   const dispatch = useDispatch()
//   const handleHome = () => {
//     console.log("llegue a handle");
//     dispatch(getGames())
//   }

//   return (
//     <div className={style.filterbox}>
//       {/* <div className={style.navbar}>
//         <Link to="/home">
//           <button onClick={handleHome} className={style.button}>Home</button>
//         </Link>
//         <Link to="/create">
//           <button className={style.button}>Add game</button>
//         </Link>
//       </div> */}
//       <div className={style.filters}>
//         <p className={style.text}> Aca van mis:</p>
//         <select>
//           <option value="asc">Ascendente</option>
//           <option value="desc">Descendente</option>
//         </select>
//         <br />
//         <select>
//           <option value="created">Agregados</option>
//           <option value="nocreated">Existentes</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Filters;
