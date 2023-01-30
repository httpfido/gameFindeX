import style from "./Card.module.css";

const Card = ({ name, image, genres, platform }) => {
  return (
    <div className={style.card}>
      <p className={style.name}>{name}</p>
      <div className={style.imgContainer}>
        <img className="img" src={image} alt="My" />
      </div>
      <div className={style.att}>
        <div className={style.div1}>
        <p className={style.tituloGenres}>Genres:</p>
        <p className={style.genres}>{genres}</p>
        </div>
        <div className={style.div1}>
        <p className={style.tituloPlatform}>Platform:</p>
        <p className={style.platform}>{platform}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
