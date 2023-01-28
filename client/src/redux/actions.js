import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GAME = "GET_GAME";
export const GET_ID = "GET_ID";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORM = "GET_PLATFORM";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";


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
  }
}
// mi actionCreator get de genres
export const getGenres = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/genres`);
    const genres = apiData.data.map(g=>g.name)
    console.log(genres);
    dispatch({ type: GET_GENRES, payload: genres });
  };
};

// mi actionCreator get de platform
export const getPlatform = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/platforms`);
    const platform = apiData.data
    dispatch({ type: GET_PLATFORM, payload: platform });
  };
};

// mi actionCreator filtrar por genero
export const filterByGenre = (payload) => {
  return { type: FILTER_BY_GENRE, payload  }
};



