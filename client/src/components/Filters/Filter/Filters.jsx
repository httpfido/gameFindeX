import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import check from "../../../assets/check.svg";
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

export default function Filters() {
  // const [byGenre, setByGenre] = useState();
  const dispatch = useDispatch();
  const myGenres = useSelector((state) => state.copyOfGenres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [source, setSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [openStorage, setOpenStorage] = useState(false)
  const [order, setOrder] = useState()
  // function handleFilterByGenre(e) {
  //   e.preventDefault();
  //   if (e.target.value !== "all" && source.length <= 3) {
  //     setSource((prevSource) => [...prevSource, e.target.value]);
  //     console.log(source.length);
  //   }
  // }

  // function handleDeleteG(e) {
  //   setSource(source.filter((element) => element !== e.target.value));
  //   dispatch(filterByGenre(source));
  // }

  // CON MENU DESPLEGABLE
  const [selectValue, setSelectValue] = useState("all");

  const handleFilterByGenre = (event) => {
    const genre = event.target.value;
    if (genre === undefined) return;
    if (source.includes(genre)) {
      setSource(source.filter((g) => g !== genre));
    } else {
      setSource([...source, genre]);
    }
    console.log(source);
  };

  useEffect(() => {
    console.log(source);
    dispatch(filterByGenre(source));
    dispatch(resetPage());
  }, [source, dispatch]);
  // setSource((prevSource) => prevSource.filter((element) => element !== e.target.value));

  function handleFilterByRating(e) {
    e.preventDefault();
    e.target.value === "all"
      ? dispatch(getGames) && setOrder(`Rating ${e.target.value}`)
      : dispatch(filterByRating(e.target.value));
    setOrder(`Rating ${e.target.value}`);
  }

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
    let source = e.target.value;
    console.log(source);
    dispatch(filterCreated(source));
    dispatch(resetPage());
  }

  return (
    <div className={style.filters}>
      <div className={style.filterContainer}>

        <div className={style.aligns}>
          <button
            className={style.openDropdown}
            onClick={() => setOpen(!open)}
            value="all"
          >

            Filter by: Genres
          </button>
          <div
            className={
              style.dropdownGenres + " " + (open ? style.opened : style.closed)
            }
            value={selectValue}
          >
            {myGenres?.map((element, index) => (
              <button
                className={style.options}
                onClick={(e) => {
                  setOpen(!open);
                  handleFilterByGenre(e);
                }}
                key={index}
                value={element}
              >
                {element}{" "}
                {source.includes(element) ? (
                  <img className={style.check} src={check} alt="" />
                ) : (
                  ""
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={style.storageContainer}>

        <div className={style.aligns}>
          <button className={style.openDropdown} onClick={()=>setOpenStorage(!openStorage)}>Storage</button>
        </div>

        <div className={openStorage ? style.storageopenedS : style.storageclosedS}>
          <button onClick={(e) => handleFilterCreated(e)} value="all"
          className={style.storageButton}>
            All
          </button>
          <button onClick={(e) => handleFilterCreated(e)} value="lb"
          className={style.storageButton}>
            Library
          </button>
          <button onClick={(e) => handleFilterCreated(e)} value="db"
          className={style.storageButton}>
            Created
          </button>
        </div>

        {/* <select
          className={style.openDropdown}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option value="all">All</option>
          <option value="lb">Library</option>
          <option value="db">Created in DB</option>
        </select> */}
      </div>

      <div className={style.sortingContainer}>

        <div className={style.aligns}>
          <select className={style.options} onChange={(e) => handleFilterByRating(e)}>
            <option value="all">All</option>
            <option value="asc">Rating Asc</option>
            <option value="desc">Rating Desc</option>
          </select>
        </div>
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
