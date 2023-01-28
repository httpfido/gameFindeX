import style from "./CardContainer.module.css";
import Card from "../Card/Card";

import Pagination from "../../components/Paginado/Paginado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";

// defino mi Card Container
const CardContainer = () => {

// como primera instancia, le ordeno al reducer que haga la peticion a la api de todos los juegos, y los meta
// en el objeto global 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);


// aca agarro ese array de juegos del objeto global y lo meto en allGames
  const allGames = useSelector((state) => state.games);

// a continuacion, declaro estados locales
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);

// ahora voy a hacer logica numerica para el paginado
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

// declaro una funcion que va a modificar el estado local de CurrentPage, esto lo voy a pasar 
// como prop al componente Paginated
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

// ahora si, renderizamos el componente
  return (
    <div>
      <Pagination
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        paginado={paginado}
      />
      <div className={style.container}>
        {currentGames.map((game) => {
          return (
            <Card
              image={game.background_image}
              name={game.name}
              genres={game.genres}
              platforms={game.platforms}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardContainer;
