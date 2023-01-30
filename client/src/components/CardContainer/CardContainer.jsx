import style from "./CardContainer.module.css";
import Card from "../Card/Card";

import Pagination from "../../components/Paginado/Paginado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, setPage, cleanDetail } from "../../redux/actions";
import { Link } from "react-router-dom";

// defino mi Card Container
const CardContainer = () => {

  
  // aca agarro ese array de juegos del objeto global y lo meto en allGames
  const allGames = useSelector((state) => state.games);
  const currentPage = useSelector(state => state.currentPage)
  
  // a continuacion, declaro estados locales
  // const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  
  // ahora voy a hacer logica numerica para el paginado
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  // le ordeno al reducer que haga la peticion a la api de todos los juegos, y los meta
  // en el objeto global 
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getGames());
      // return ()=>{
      //   dispatch(cleanDetail())
      // }
    }, [dispatch]);


// declaro una funcion que va a modificar el estado local de CurrentPage, esto lo voy a pasar 
// como prop al componente Paginated
  const paginado = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  if (allGames.length === 0) return <h1>Cargando</h1>;


// ahora si, renderizamos el componente
  return (
    <div className={style.container}>
      
      <Pagination
        currentPage={currentPage}
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        paginado={paginado}
      />
      <div className={style.cardContainer}>
        {currentGames.map((game, index) => {
          return (
            <div>
              <Link to={`/home/${game.id}`} className={style.link}>
              <Card
                key={index}
                image={game.background_image}
                name={game.name}
                genres={game.genres}
                platforms={game.platforms}
              />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardContainer;
