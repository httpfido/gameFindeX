import { getById } from "../../redux/actions";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";
// import style from "./Detail.module.css";

const Detail = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { id } = useParams();
  const gamesDetail = useSelector((state) => state.game);
  // const [gameState, setGameState] = useState(gamesDetail);


  // useEffect(() => {
  //   if (gamesDetail) {
  //     setGameState(gamesDetail);
  //   }
  // }, [gamesDetail]);

  if (!gamesDetail) return <h1>Cargando</h1>;
  
  
    return (
      <div>
        <div className="">
          {gamesDetail ? (
            <div>
              <img
                className=""
                src={gamesDetail.background_image}
                alt="imgNotFound"
              />
  
              <h1 className="">
                {gamesDetail.name ? gamesDetail.name : "404 - Not Found"}
              </h1>
  
              <div className="">
                <h3>Games count: {gamesDetail.games_count ? gamesDetail.games_count : 0}</h3>
  
                {gamesDetail.description ? (
                  <p
                    className=""
                    dangerouslySetInnerHTML={{ __html: gamesDetail.description }}
                  ></p>
                ) : (
                  <p>"GamegamesDetail detail not found in database"</p>
                )}
              </div>
            </div>
          ) : (
            <h1>Reloading</h1>
          )}
  
          <Link to="/home">
            <button className="">
              <h3>Back to Home</h3>
            </button>
          </Link>
          <br />
          <br />
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
