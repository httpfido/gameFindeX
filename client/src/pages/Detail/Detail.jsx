import { cleanDetail, getById } from "../../redux/actions";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import style from "./Detail.module.css";
import star from "../../assets/star.svg";

const Detail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch]);

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.pageYOffset > 0);
    });
  }, []);

  
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { id } = useParams();
  const game = useSelector((state) => state.game);

  if (!game) return <h1>Cargando</h1>;

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img
          className={scroll ? style.imgScrolled : style.img}
          src={game.background_image}
          alt="imgNotFound"
        />

        <div 
        className={scroll ? style.dataContainerScrolled : style.dataContainer}

        >
          <div className={style.ratingContainer}>
            <p className={style.rating}>{game?.rating}</p>
            <img src={star} className={style.star} alt="" />
          </div>
          <div className={style.nameDescriptionContainer}>
            <h1 className={style.name}>
              {game.name ? game.name : "404 - Not Found"}
            </h1>
            <h3 className={style.genres}>{game.genres?.join(", ")}</h3>
            {game.description ? (
              <p
                className={style.description}
                dangerouslySetInnerHTML={{
                  __html: game.description,
                }}
              ></p>
            ) : (
              <p>"Game detail not found in database"</p>
            )}
          </div>
          <div className={style.extraData}></div>
        </div>
      </div>
      <div className={style.bottomContainer}>
        <Link to="/home">
          <button className={style.back}>
            <h3>Back to Home</h3>
          </button>
        </Link>
      </div>
    </div>
  );

  // return (

  //   <div>
  //     {gameState.map((game) => {
  //       return (
  //         <div key={game.id}>
  //           <h1>{game?.name}</h1>

  //           <img src={game?.background_image} alt="" />

  //           <br></br>

  //           <label>Released: </label>
  //           <p>{game?.released}</p>

  //           <label>Platforms: </label>
  //           <p>{game?.platforms}</p>

  //           <label>Description: </label>
  //           <p>{game?.description}</p>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};

export default Detail;
