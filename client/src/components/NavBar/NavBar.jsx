import { Link } from 'react-router-dom'
import style from './NavBar.module.css'

const NavBar = () => {
    return(
        <div className={style.mainContainer}>
            <Link to="/home">H O M E</Link>
            <Link to="/create">F O R M</Link>
        </div>
    )
}

export default NavBar