import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import check from "../../../assets/check.svg";
import chevron from "../../../assets/chevron.svg"

import {
  filterByGenre,
  filterByRating,
  filterByAbc,
  filterCreated,
  getGenres,
  resetPage,
} from "../../../redux/actions";
import style from "./Filters.module.css";

export default function Filters() {

  const dispatch = useDispatch();
  const myGenres = useSelector((state) => state.copyOfGenres);


  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [source, setSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [openStorage, setOpenStorage] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [openABC, setOpenABC] = useState(false);

  const [selectValue, setSelectValue] = useState("all");

  const handleFilterByGenre = (event) => {
    const genre = event.target.value;
    if (genre === undefined) return;
    if (source.includes(genre)) {
      setSource(source.filter((g) => g !== genre));
    } else {
      setSource([...source, genre]);
    }
  };

  useEffect(() => {
    console.log(source);
    dispatch(filterByGenre(source));
    dispatch(resetPage());
  }, [source, dispatch]);

  function handleFilterByRating(e) {
    e.preventDefault();
    let source = e.target.value;
    dispatch(filterByRating(source));
    dispatch(resetPage());
  }

  function handleFilterByAbc(e) {
    e.preventDefault();
    let source = e.target.value;
    dispatch(filterByAbc(source));
    dispatch(resetPage());
  }

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
          <button className={style.openDropdown} onClick={() => setOpen(!open)}>
            Filter by: Genres
          </button>
        </div>
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

      <div className={style.storageContainer}>
        <div className={style.aligns}>
          <button
            className={style.openDropdown}
            onClick={() => setOpenStorage(!openStorage)}
          >
            Storage <img src={chevron} alt="" className={openStorage ? style.chevron : style.chevront}/>
          </button>
        </div>

        <div
          className={openStorage ? style.storageopenedS : style.storageclosedS}
        >
          <button
            onClick={(e) => handleFilterCreated(e)}
            value="all"
            className={style.storageButton}
          >
            All
          </button>
          <button
            onClick={(e) => handleFilterCreated(e)}
            value="lb"
            className={style.storageButton}
          >
            Library
          </button>
          <button
            onClick={(e) => handleFilterCreated(e)}
            value="db"
            className={style.storageButton}
          >
            Created
          </button>
        </div>
      </div>

      <div className={style.sortingContainer}>
        <div className={style.aligns}>
          <button
            className={style.openDropdown}
            onClick={() => setOpenRating(!openRating)}
          >
            Order by: Rating <img src={chevron} alt="" className={openRating ? style.chevron : style.chevront}/>
          </button>
        </div>

        <div
          className={openRating ? style.storageopenedS : style.storageclosedS}
        >
          <button
            onClick={(e) => handleFilterByRating(e)}
            value="all"
            className={style.storageButton}
          >
            All
          </button>
          <button
            onClick={(e) => handleFilterByRating(e)}
            value="asc"
            className={style.storageButton}
          >
            Ascending 
          </button>
          <button
            onClick={(e) => handleFilterByRating(e)}
            value="desc"
            className={style.storageButton}
          >
            Descending
          </button>
        </div>
      </div>

      <div className={style.sortingContainer}>
        <div className={style.aligns}>
          <button
            className={style.openDropdown}
            onClick={() => setOpenABC(!openABC)}
          >
            Order by: Alphabetic <img src={chevron} alt="" className={openABC ? style.chevron : style.chevront}/>
          </button>
        </div>

        <div
          className={openABC ? style.storageopenedS : style.storageclosedS}
        >
          <button
            onClick={(e) => handleFilterByAbc(e)}
            value="all"
            className={style.storageButton}
          >
            All
          </button>
          <button
            onClick={(e) => handleFilterByAbc(e)}
            value="asc"
            className={style.storageButton}
          >
            A-Z 
          </button>
          <button
            onClick={(e) => handleFilterByAbc(e)}
            value="desc"
            className={style.storageButton}
          >
            Z-A
          </button>
        </div>
      </div>
    </div>
  );
}