import style from "./Landing.module.css";
import { NavLink } from "react-router-dom";
import logosinfondo from '../../assets/logo-sin-fondo.png'
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getGames } from "../../redux/actions";

const Landing = () => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(getGames());
    // }, [dispatch, ]);

  return (
    <div className={style.container}>
      <img src={logosinfondo} alt="" className={style.logo}/>
      <div className={style.midContainer}>
        <NavLink to="/home" className={style.navlink}>
          <button className={style.start}>S T A R T</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
