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
        <p className={style.title}>Genres:</p>
        <p className={style.values}>{genres}</p>
        </div>
        <div className={style.div1}>
        <p className={style.title}>Platform:</p>
        <p className={style.values}>{platform}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
