import { getGamesDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gamesDetail = useSelector((state) => state.gamesDetail);

  const [gameState, setGameState] = useState([...gamesDetail]);

  useEffect(() => {
    dispatch(getGamesDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gamesDetail) {
      setGameState([...gamesDetail]);
    }
  }, [gamesDetail]);

  if (gamesDetail.length === 0) return <h1>Cargando</h1>;

  return (
    <div>
      {gameState.map((game) => {
        return (
          <div key={game.id}>
            <h1>{game?.name}</h1>

            <img className={style.img} src={game?.image} alt="" />

            <br></br>

            <label>Released: </label>
            <p>{game?.released}</p>

            <label>Rating: </label>
            <p>{game?.rating}</p>

            <label>Platforms: </label>
            <p>{game?.platforms}</p>

            <label>Description: </label>
            <p>{game?.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Detail;
