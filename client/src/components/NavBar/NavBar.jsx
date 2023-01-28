import { Link } from 'react-router-dom'
import style from './NavBar.module.css'

const NavBar = () => {
    return(
            <div className={style.mainContainer}>

                <Link to="/home" className={style.btnHome}>H O M E</Link>
                <Link to="/create" className={style.btnHome}>F O R M</Link>
            </div>
        )
    }
    
    export default NavBar
    
    
    
    
    
    
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