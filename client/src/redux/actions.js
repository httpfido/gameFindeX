import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GAME = "GET_GAME";
export const GET_ID = "GET_ID";

// los dispatch se hacen desde los componentes


// mi actionCreator de allgames
export const getGames = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/videogames/");
    const games = apiData.data;
    dispatch({ type: GET_GAMES, payload: games });
  };
};

// mi actionCreator get por NAME
export const getGame = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    const game = apiData.data;
    dispatch({ type: GET_GAME, payload: game });
  };
};

// mi actionCreator get por ID
export const getById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
    const game = apiData.data;
    dispatch({ type: GET_ID, payload: game });
  };
};



