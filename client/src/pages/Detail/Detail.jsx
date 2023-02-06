import { cleanGames, getById } from "../../redux/actions";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(id));
    return ()=>{
      cleanGames()
    }
  }, [dispatch]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { id } = useParams();
  const gamesDetail = useSelector((state) => state.game);


  if (!gamesDetail) return <h1>Cargando</h1>;

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img
          className={style.img}
          src={gamesDetail.background_image}
          alt="imgNotFound"
        />

        <div className={style.dataContainer}>
          <div className={style.nameDescriptionContainer}>
            <h1 className={style.name}>
              {gamesDetail.name ? gamesDetail.name : "404 - Not Found"}
            </h1>

            {gamesDetail.description ? (
              <p
                className={style.description}
                dangerouslySetInnerHTML={{
                  __html: gamesDetail.description,
                }}
              ></p>
            ) : (
              <p>"Game detail not found in database"</p>
            )}
          </div>
          <div className={style.extraData}></div>
        </div>
      </div>

      <Link to="/home">
        <button className="">
          <h3>Back to Home</h3>
        </button>
      </Link>
      <br />
      <br />
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

  //           <label>Rating: </label>
  //           <p>{game?.rating}</p>

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
