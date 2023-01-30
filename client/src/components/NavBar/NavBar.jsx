import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

import { useDispatch, useSelector } from "react-redux";
import { getGames, backupPage, cleanDetail } from "../../redux/actions";

const NavBar = () => {
  const searchGames = useSelector((state) => state.game);


  const dispatch = useDispatch();
  const handleHome = () => {
    dispatch(cleanDetail())
    dispatch(getGames());
    dispatch(backupPage())
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
