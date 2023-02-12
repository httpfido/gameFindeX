import thumbDown from "../../assets/thumbDown.svg";
import style from "./noFound.module.css";
const NoFound = () => {
  return (
    <div className={style.noFoundContainer}>
      <h1 className={style.text}>We don't have results here yet </h1>
      <img src={thumbDown} className={style.thumbDown} alt="" />
    </div>
  );
};

export default NoFound;
