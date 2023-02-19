import style from "./CardContainer.module.css";
import Card from "../Card/Card";
import Filters from "../../components/Filters/Filter/Filters";
import Hamster from "../Loader/Hamster";
import NoFound from "../Loader/noFound"
import imgDefault from "../../assets/img-default.png"

import Pagination from "../../components/Paginado/Paginado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, setPage } from "../../redux/actions";
import { Link, useLocation } from "react-router-dom";

// defino mi Card Container
const CardContainer = () => {

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  const searchGame = useSelector((state) => state.searchGames);
  // le digo al reducer que haga la peticion a la api de todos los juegos, y los meta
  // en el objeto global
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames(searchGame));
  }, [dispatch, searchGame]);

  // agarro el array de juegos del objeto global y lo meto en allGames
  const currentPage = useSelector((state) => state.currentPage);
  const allGames = useSelector((state) => state.games);
  // tambien voy a utilizar un global aux cuando el filtrado no devuelva results
  const hasFilteredResults = useSelector(state => state.hasFilteredResults);
  // const gamesBackup = useSelector(state => state.gamesBackup);
// console.log(gamesBackup);
// console.log(allGames);


  // a continuacion, declaro estados locales
  const [gamesPerPage] = useState(16);

  // ahora voy a hacer logica numerica para el paginado
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  // declaro una funcion que va a modificar el estado local de CurrentPage, esto lo voy a pasar
  // como prop al componente Paginated
  const paginado = (pageNumber, gamesLength) => {
    dispatch(setPage(pageNumber, gamesLength));
  };
  
  if (!allGames.length) {
    return <Hamster/>
  }


  // ahora si, renderizamos el componente
  return (
    <div className={style.container} >
      <Pagination
        currentPage={currentPage}
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        paginado={paginado}
      />
      <div className={style.cardContainer}>
        {hasFilteredResults?
        currentGames.map((game) => {
          return (
            <div key={"CO MAP" + game.id }>
            <Link to={`/home/${game.id}`} className={style.link} key={"CO5"}>
            <Card
            key={game.id}
            image={game.background_image ? game.background_image : imgDefault}
            name={game.name}
            genres={game.genres?.join(", ")}
            platform={game.platform?.slice(0, 3).join(", ")}
            rating={game.rating}
            />
            </Link>
            </div>
            );
          })
         : <NoFound/>}
          </div >
      <Filters />
    </div>
  );
};

export default CardContainer;
