import style from "./Card.module.css";
import star from "../../assets/star.svg";

const Card = ({ name, image, genres, platform, rating }) => {
  return (
    <div className={style.card}>
      <p className={style.name}>{name}</p>
      <div className={style.imgContainer}>
        <img className={style.img} src={image} alt="My" />
      </div>
      <div className={style.att}>
        <div className={style.div1}>
          <p className={style.title}>Genres:</p>
          <p className={style.values}>{genres ? genres : "Not specified"}</p>
        </div>
        <div className={style.div1}>
          <p className={style.title}>Platform:</p>
          <p className={style.values}>
            {platform ? platform : "Currently unavailable"}
          </p>
          <p className={style.rating}>
            {rating ? rating : "Not rated"}{" "}
            <img src={star} className={style.icon} alt="" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
