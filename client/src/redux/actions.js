import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const BY_NAME = "BY_NAME";
export const GET_ID = "GET_ID";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORM = "GET_PLATFORM";
export const SET_PAGE = "SET_PAGE"
export const RESET_PAGE = "RESET_PAGE"
export const GO_BACKUP_PAGE = "GO_BACKUP_PAGE"
export const SEARCH_GAME = "SEARCH_GAME"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_RATING = "FILTER_BY_RATING"
export const FILTER_BY_ABC = "FILTER_BY_ABC"
export const FILTER_CREATED = "FILTER_CREATED"
export const CLEAN_GAMES = "CLEAN_GAMES"
export const POINTER = "POINTER"

// los dispatch se hacen desde los componentes
// mi actionCreator de allgames

// export const getGames = (dispatch) => {
//   return async function (dispatch) {
//     const apiData = await axios.get("http://localhost:3001/videogames/");
//     const games = apiData.data;
//     dispatch({ type: GET_GAMES, payload: games });
//   };
// };

// mi actionCreator get por NAME
export const getGames = (name) => {
  return async function (dispatch) {
    const apiData = name ? await axios.get(`http://localhost:3001/videogames?name=${name}`)
    : await axios.get("http://localhost:3001/videogames/");
    const results = apiData.data;
    dispatch({ type: GET_GAMES, payload: results });
  };
};

// backup de commit "martes madrugada"
// export const getGames = (paylo) => {
//   return async function (dispatch) {
//     const apiData = await axios.get("http://localhost:3001/videogames/");
//     const games = apiData.data;
//     dispatch({ type: GET_GAMES, payload: games });
//   };
// };

// export const getGame = (name) => {
//   return async function (dispatch) {
//     const apiData = await axios.get(`http://localhost:3001/videogames?name=${name}`);
//     const games = apiData.data;
//     dispatch({ type: BY_NAME, payload: games });
//   };
// };




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

export const searchGame = (payload) => {

  return {
    type: SEARCH_GAME,
    payload,
  };
};

export const setPage = (payload, gamesLength) => {
  return {type: SET_PAGE, payload, gamesLength}
}

export const resetPage = () => {
  return {type: RESET_PAGE, payload: 1}
}

export const backupPage = () => {
  return {type: GO_BACKUP_PAGE  }
}

export const filterByGenre = (payload) => {
  return {
      type: FILTER_BY_GENRE,
      payload: payload
  }
}

export const filterByRating = (payload) => {
  return {
      type: FILTER_BY_RATING,
      payload
  }
}

export const filterByAbc = (payload) => {
  return {
      type: FILTER_BY_ABC,
      payload
  }
}

export const filterCreated = (payload) => {
  return {
      type: FILTER_CREATED,
      payload
  }
}

export const cleanDetail = () => {
  return {
    type: CLEAN_GAMES,
    payload: []
}
}