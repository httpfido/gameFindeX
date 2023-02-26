import style from "./CardContainer.module.css";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";

import Filters from "../../components/Filters/Filter/Filters";
import Hamster from "../Loader/Hamster";
import NoFound from "../Loader/noFound";
import imgDefault2 from "../../assets/img-default2.png";

import Pagination from "../../components/Paginado/Paginado";
import PaginationBottom from "../../components/Paginado/PaginadoBottom";
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
      behavior: "smooth",
    });
  }, [pathname]);

  const allGames = useSelector((state) => state.games);
  const searchGame = useSelector((state) => state.searchGames);
  // le digo al reducer que haga la peticion a la api de todos los juegos, y los meta
  // en el objeto global
  const dispatch = useDispatch();
console.log(searchGame);
  useEffect(() => {
    if (allGames.length && !searchGame) {
      return;
    }
    dispatch(getGames(searchGame));
  }, [dispatch, searchGame, allGames.length]);

  // agarro el array de juegos del objeto global y lo meto en allGames
  const currentPage = useSelector((state) => state.currentPage);
  // tambien voy a utilizar un global aux cuando el filtrado no devuelva results
  const hasFilteredResults = useSelector((state) => state.hasFilteredResults);
  // const gamesBackup = useSelector(state => state.gamesBackup);

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
    return (
      <div className={style.bodyLoad}>
        <Hamster />
        <Footer />
      </div>
    );
  }

  // ahora si, renderizamos el componente
  return (
    <div className={style.body}>
      <div className={style.container}>
        <Filters className={style.filters} />
        <div className={style.paginatedAndCards}>
          <Pagination
            currentPage={currentPage}
            gamesPerPage={gamesPerPage}
            allGames={allGames.length}
            paginado={paginado}
          />
          <div className={style.cardContainer}>
            {hasFilteredResults ? (
              currentGames.map((game) => {
                return (
                  <div key={"CO MAP" + game.id}>
                    <Link
                      to={`/home/${game.id}`}
                      className={style.link}
                      key={"CO5"}
                    >
                      <Card
                        key={game.id}
                        image={
                          game.background_image
                            ? game.background_image
                            : imgDefault2
                        }
                        name={game.name}
                        genres={game.genres?.join(", ")}
                        platform={game.platform?.slice(0, 3).join(", ")}
                        rating={game.rating}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <NoFound />
            )}
          </div>
          <PaginationBottom
            currentPage={currentPage}
            gamesPerPage={gamesPerPage}
            allGames={allGames.length}
            paginado={paginado}
            className={style.paginationBot}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CardContainer;
