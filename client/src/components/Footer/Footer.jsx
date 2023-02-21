import style from "./Footer.module.css"
import logosinfondo from "../../assets/logo-sin-fondo.png";
import ig from "../../assets/ig.svg";
import linkedin from "../../assets/linkedin.svg";
import github from "../../assets/github.svg";

const Footer = () => {
  return (
    <div className={style.footerScrolled}>
    <div className={style.logoContainer}>
      <img src={logosinfondo} alt="" className={style.logo} />
    </div>
    <h3 className={style.text}>
      Ⓒ All rights reserved GameFINDEX S.A. contact +54 9 11 2719-1198
    </h3>
    <div className={style.contact}>
      <a href="https://www.instagram.com/http_fido/" target="_blank">
        <img src={ig} alt="" className={style.icon} />
      </a>
      <a href="https://github.com/FideRomano" target="_blank">
        <img src={github} alt="" className={style.icon} />
      </a>
      <a href="https://www.linkedin.com/in/fidel-romano/" target="_blank">
        <img src={linkedin} alt="" className={style.icon} />
      </a>
    </div>
  </div>
  );
};

export default Footer 