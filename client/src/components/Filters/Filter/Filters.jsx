import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSource, setOrder } from "../../../redux/actions";
import check from "../../../assets/check.svg";
import chevron from "../../../assets/chevron.svg";

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
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  
  const myGenres = useSelector((state) => state.copyOfGenres);
  const order = useSelector((state) => state.order);
  const source = useSelector((state) => state.sourceFilterGenre);
  
  const [open, setOpen] = useState(false);
  const [openStorage, setOpenStorage] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [openABC, setOpenABC] = useState(false);
  const [sourceCreated, setSourceCreated] = useState(false);

  useEffect(() => {
    dispatch(filterByGenre(source));
    dispatch(resetPage());
  }, [source, dispatch]);
  
  useEffect(() => {
    if (order === null) return;
    order === "reset" || order === "asc" || order === "desc"
    ? dispatch(filterByRating(order))
    : dispatch(filterByAbc(order));
    dispatch(resetPage());
  }, [dispatch, order]);
  
  const handleFilterByGenre = (event) => {
    const genre = event.target.value;

    if (genre === undefined) return;
    if (source.includes(genre)) {
      dispatch(setSource(source.filter((g) => g !== genre)));
    } else {
      if (source === "reset") {
        dispatch(setSource([genre]));
      } else{
        dispatch(setSource([...source, genre]));
      }
    }
  };
  
  useEffect(() => {
    dispatch(filterCreated(sourceCreated));
    dispatch(resetPage());
  }, [dispatch,sourceCreated]);
  
  const handleFilterCreated = (e) => {
    e.preventDefault();
    setSourceCreated(e.target.value);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    let source = e.target.value;
    dispatch(setOrder(source));
    dispatch(resetPage());
  };

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
              {element}
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
            Storage{" "}
            <img
              src={chevron}
              alt=""
              className={openStorage ? style.chevron : style.chevront}
            />
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
            {sourceCreated === "lb" ? (
              <img src={check} alt="" className={style.check} />
            ) : (
              ""
            )}
          </button>
          <button
            onClick={(e) => handleFilterCreated(e)}
            value="db"
            className={style.storageButton}
            >
            Created
            {sourceCreated === "db" ? (
              <img src={check} alt="" className={style.check} />
            ) : (
              ""
            )}
          </button>
        </div>
      </div>

      <div className={style.sortingContainer}>
        <div className={style.aligns}>
          <button
            className={style.openDropdown}
            onClick={() => setOpenRating(!openRating)}
          >
            Order by: Rating{" "}
            <img
              src={chevron}
              alt=""
              className={openRating ? style.chevron : style.chevront}
              />
          </button>
        </div>

        <div
          className={openRating ? style.storageopenedS : style.storageclosedS}
        >
          <button
            onClick={(e) => handleOrder(e)}
            value="reset"
            className={style.storageButton}
            >
            Reset
          </button>
          <button
            onClick={(e) => handleOrder(e)}
            value="asc"
            className={style.storageButton}
            >
            Ascending
            {order === "asc" ? (
              <img src={check} alt="" className={style.check} />
              ) : (
                ""
                )}
          </button>
          <button
            onClick={(e) => handleOrder(e)}
            value="desc"
            className={style.storageButton}
          >
            Descending
            {order === "desc" ? (
              <img src={check} alt="" className={style.check} />
            ) : (
              ""
            )}
          </button>
        </div>
      </div>

      <div className={style.sortingContainer}>
        <div className={style.aligns}>
          <button
            className={style.openDropdown}
            onClick={() => setOpenABC(!openABC)}
          >
            Order by: Alphabetic{" "}
            <img
              src={chevron}
              alt=""
              className={openABC ? style.chevron : style.chevront}
            />
          </button>
        </div>

        <div className={openABC ? style.storageopenedS : style.storageclosedS}>
          <button
            onClick={(e) => handleOrder(e)}
            value="resetABC"
            className={style.storageButton}
          >
            Reset
          </button>
          <button
            onClick={(e) => handleOrder(e)}
            value="AZ"
            className={style.storageButton}
          >
            A-Z
            {order === "AZ" ? (
              <img src={check} alt="" className={style.check} />
            ) : (
              ""
            )}
          </button>
          <button
            onClick={(e) => handleOrder(e)}
            value="ZA"
            className={style.storageButton}
          >
            Z-A
            {order === "ZA" ? (
              <img src={check} alt="" className={style.check} />
            ) : (
              ""
            )}
          </button>
        </div>
      </div>
    </div>
  );
}