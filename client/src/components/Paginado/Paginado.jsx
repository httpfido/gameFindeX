import React from "react";
import { useDispatch } from "react-redux";
import style from "./Pagination.module.css";
import {
  backupPage,
  getGames,
  cleanGames,
} from "../../redux/actions";


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
const dispatch = useDispatch()
  const handleBack = () =>{
    dispatch(getGames());
    dispatch(cleanGames());
    dispatch(backupPage());
  }
  pageNumber.pop();
  const prev = "<< Prev"
  const next = "Next >>"
  return (
    
    <div  className={style.container}>

      {allGames < 90 && <button className={style.back} onClick={handleBack}> BACK </button>}

      {currentPage !== 1? 
      <button className={style.prev} key="prev" onClick={() => handlePrev(currentPage)}> {prev} </button> 
      : ""}
      
    <div className={style.paginationButtonContainer}>
      {pageNumber &&
        pageNumber.map((number) => {
          return (
            <div key={number}>
              <button className={`${style.paginationButton} ${
      currentPage === number ? style.focus : ''
    }`} onClick={() => paginado(number, allGames)}>
                {number}
              </button>
            </div>
          );
        })}
</div>

        {currentPage !== Math.ceil(allGames / gamesPerPage)? 
        <button className={style.next} key="next" onClick={() => handleNext(currentPage)}>{next}</button>
        : ""}
        </div>
  );
};


export default Pagination;

