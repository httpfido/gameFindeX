import React from "react";
import { useSelector } from "react-redux";
import style from "./Pagination.module.css";
import chevron from "../../assets/chevron.svg";

const PaginationBottom = ({ gamesPerPage, allGames, paginado, currentPage }) => {
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

  pageNumber.pop();
  const prev = "Prev ";
  const next = "Next";
  return (
    <div className={style.container}>
      <div className={style.paginationButtonContainer}>
        {hasFilteredResults ? (
          <>
            <button
              className={currentPage !== 1 ? style.prev : style.prevNot}
              key="prev"
              onClick={() => handlePrev(currentPage)}
            >
              <img src={chevron} className={style.chevronPrev} alt="" />
              {prev}
            </button>

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

            <button
              className={
                currentPage !== Math.ceil(allGames / gamesPerPage)
                  ? style.next
                  : style.nextNot
              }
              key="next"
              onClick={() => handleNext(currentPage)}
            >
              {next}
              <img src={chevron} className={style.chevronNext} alt="" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PaginationBottom;
