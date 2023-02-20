import style from "./Landing.module.css";
import { NavLink, useLocation } from "react-router-dom";
import logosinfondo from "../../assets/logo-sin-fondo.png";
import { useEffect, useState } from "react";
import ig from "../../assets/ig.svg";
import linkedin from "../../assets/linkedin.svg";
import github from "../../assets/github.svg";

const Landing = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.pageYOffset > 0);
    });
    return () => {
      setScroll(0);
    };
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={style.container}>
      <div className={style.midContainer}>
        <NavLink to="/home" className={style.navlink}>
          <button className={style.start}>S T A R T</button>
        </NavLink>
      </div>
      <div className={scroll ? style.footerScrolled : style.footer}>
        <div className={style.logoContainer}>
          <img src={logosinfondo} alt="" className={style.logo} />
        </div>
        <h3 className={style.text}>
          Ⓒ All rights reserved GameFINDEX S.A. contact +54 9 11 2719-1198
        </h3>
        <div className={style.contact}>
          <a href="https://www.instagram.com/http_fido/">
            <img src={ig} alt="" className={style.icon} />
          </a>
          <a href="https://github.com/FideRomano">
            <img src={github} alt="" className={style.icon} />
          </a>
          <a href="https://www.linkedin.com/in/fidel-romano/">
            <img src={linkedin} alt="" className={style.icon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
