import { Link, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";

import SearchBar from "../SearchBar/SearchBar";
import plus from "../../assets/plus.svg";
import logosinfondo from "../../assets/logo-sin-fondo.png";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, resetPage, cleanGames } from "../../redux/actions";

const NavBar = () => {
  const searchGames = useSelector((state) => state.game);
  const allGames = useSelector((state) => state.games);
  const location = useLocation();

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.pageYOffset > 0);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const dispatch = useDispatch();
  const handleHome = () => {
    // quiero que:
    // si ya estoy en home && allgames.length > 155  => resetPage
    // si ya estoy en home viendo results => resetPage && dispach allGames && no guardar backup page
    // si no estoy en home => /home && backup page

    if (location.pathname === "/home" && allGames.length > 155) {
      dispatch(resetPage());
    } else if (location.pathname === "/home") {
      dispatch(getGames());
      dispatch(cleanGames());

      dispatch(resetPage());
    } else {
      dispatch(resetPage());
    }
  };

  return (
    <nav className={scroll ? style.scrolled : style.nav}>
      <div className={style.buttons}>
        <Link to="/home" className={style.link}>
          <button onClick={handleHome} className={style.btn}>
              <img src={logosinfondo} alt="" className={style.icon} />
              <span className={style.btnText}>home</span>
          </button>
        </Link>
        <Link to="/create" className={style.link}>
          <button className={style.btn}>
              <img src={plus} alt="" className={style.icon} />
              <span className={style.btnText}>Create</span>
          </button>
        </Link>
      </div>
      <div className={style.searchContainer}>
        <SearchBar />
      </div>

      <div>
        {searchGames.length
          ? searchGames
              .map((game, index) => (
                <div key={index}>
                  <Link to={`/home/${game.id}`}>
                    <img src={game.image} alt="logo gome" />
                    <span>{game.name}</span>
                  </Link>
                </div>
              ))
              .slice(0, 3)
          : null}
      </div>
    </nav>
  );
};

export default NavBar;
