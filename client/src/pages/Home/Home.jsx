import CardContainer from "../../components/CardContainer/CardContainer";
import Pagination from "../../components/Paginado/Paginado";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGames } from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames());
}, [dispatch]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  // const currentGames = getGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.body}>
      <div className={style.orderbox}>
        <p className={style.text}> Aca van mis:</p>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <br />
        <select>
          <option value="created">Agregados</option>
          <option value="nocreated">Existentes</option>
        </select>
      </div>

      <Pagination
        gamesPerPage={gamesPerPage}
        allVideoGames={getGames.length}
        paginado={paginado}
      />

      <CardContainer />
    </div>
  );
};

export default Home;
