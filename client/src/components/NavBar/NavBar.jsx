import { Link, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

import { useDispatch, useSelector } from "react-redux";
import { backupPage, getGames, resetPage, cleanDetail } from "../../redux/actions";

const NavBar = () => {
  const searchGames = useSelector((state) => state.game);
  const allGames = useSelector((state) => state.games);
  const location = useLocation();

  const dispatch = useDispatch();
  const handleHome = () => {
    // quiero que:
    // si ya estoy en home && allgames.length > 99  => resetPage 
    // si ya estoy en home viendo results => resetPage && dispach allGames && no guardar backup page
    // si no estoy en home => /home && backup page

    if(location.pathname === "/home" && allGames.length > 90) {
      dispatch(resetPage())
    }else if(location.pathname === "/home") {
      dispatch(getGames());
      dispatch(cleanDetail())

      dispatch(backupPage());
    }else{
      dispatch(backupPage());
    }
  };


  
  return (

      <div className={style.nav}>
      <div className={style.buttons}>
        <Link to="/home">
          <button onClick={handleHome} className={style.btnHome}>
            Home
          </button>
        </Link>
        <Link to="/create">
          <button className={style.btnCreate}>+</button>
        </Link>
      </div>
        <SearchBar/>

        <div >
              {searchGames.length
                ? searchGames
                    .map((game, index) => (
                      <div key={index} >
                        <Link to={`/home/${game.id}`}>
                          <img src={game.image} alt="logo gome" />
                          <span>{game.name}</span>
                        </Link>
                      </div>
                    ))
                    .slice(0, 3)
                : null}
            </div> 
      </div>
  );
};

export default NavBar;

//     import { Link } from "react-router-dom";
//     import style from './NavBar.module.css'

// export default function Navbar() {
//   // Navbar

//   return (
//     <>
//       <ul className={style.mainContainer}>
//         <Link to="/home">
//           <li className="li">
//             <a className="a" href="#home">
//               Games
//             </a>
//           </li>
//         </Link>
//         <Link to="/create">
//           <li className="li">
//             <a href className="a">
//               Add
//             </a>
//           </li>
//         </Link>
//         <Link to="/About">
//           <li className="lasti">
//             <a href className="a">
//               About
//             </a>
//           </li>
//         </Link>
//         <Link to="/pickem">
//           <li className="lasti">
//             <a href className="a">
//               PickEm
//             </a>
//           </li>
//         </Link>
//       </ul>
//     </>
//   );
// }
