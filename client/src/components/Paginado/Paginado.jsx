import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Pagination.module.css";
import chevron from "../../assets/chevron.svg";
import { backupPage, cleanSource, cleanOrder, cleanGames, backToAllGames } from "../../redux/actions";

const Pagination = ({ gamesPerPage, allGames, paginado, currentPage }) => {
  const hasFilteredResults = useSelector((state) => state.hasFilteredResults);

  const pageNumber = [];

  for (let i = 0; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumber.push(i + 1);
  }

  const handlePrev = (currentPage) => {
    if (currentPage !== 1) paginado(currentPage - 1);
  };

  const handleNext = (currentPage) => {
    if (currentPage !== 11) paginado(currentPage + 1);
  };
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(cleanSource())
    dispatch(cleanGames());
    dispatch(backToAllGames());
    dispatch(backupPage());
    dispatch(cleanOrder())
  };
  pageNumber.pop();
  const prev = "Prev ";
  const next = "Next";
  return (
    <div className={style.container}>
      {!hasFilteredResults || allGames < 155 ? (
        <button className={style.back} onClick={handleBack}>
          BACK
        </button>
      ) : null}

      {hasFilteredResults ? (
        <>
          {currentPage !== 1 ? (
            <button
              className={style.prev}
              key="prev"
              onClick={() => handlePrev(currentPage)}
            >
              <img src={chevron} className={style.chevronPrev} alt="" />
              {prev}
            </button>
          ) : (
            ""
          )}
          <div className={style.paginationButtonContainer}>
            {pageNumber &&
              pageNumber.map((number) => {
                return (
                  <div key={number}>
                    <button
                      className={`${style.paginationButton} ${
                        currentPage === number ? style.focus : ""
                      }`}
                      onClick={() => paginado(number, allGames)}
                    >
                      {number}
                    </button>
                  </div>
                );
              })}
          </div>
          {currentPage !== Math.ceil(allGames / gamesPerPage) ? (
            <button
              className={style.next}
              key="next"
              onClick={() => handleNext(currentPage)}
            >
              {next}
              <img src={chevron} className={style.chevronNext} alt="" />
            </button>
          ) : (
            ""
          )}
        </>
      ) : null}
    </div>
  );
};

export default Pagination;
