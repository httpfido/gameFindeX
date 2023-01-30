import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ gamesPerPage, allGames, paginado, currentPage }) => {
  const pageNumber = [];
  

  for (let i = 0; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumber.push(i + 1);
  }

  const handlePrev = (currentPage)=>{
    if(currentPage !== 1) paginado(currentPage - 1) 
  }

  const handleNext = (currentPage)=>{
    if(currentPage !== 7) paginado(currentPage + 1) 
  }

  pageNumber.pop();
  const prev = "<< Prev"
  const next = "Next >>"
  return (

    <div className={style.container}>
      {currentPage !== 1? 
      <button key="prev" onClick={() => handlePrev(currentPage)}> {prev} </button> 
      : ""}
      

      {pageNumber &&
        pageNumber.map((number) => {
          return (
            <div key={number}>
              <button className={`${style.paginationButton} ${
      currentPage === number ? style.focus : ''
    }`} onClick={() => paginado(number)}>
                {number}
              </button>
            </div>
          );
        })}

        {currentPage !== Math.ceil(allGames / gamesPerPage)? 
        <button key="next" onClick={() => handleNext(currentPage)}>{next}</button>
        : ""}
    </div>
  );
};


export default Pagination;

