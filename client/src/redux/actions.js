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
export const CLEAN_DETAIL = "CLEAN_DETAIL"



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
    const games = apiData.data;
    console.log(games);
    dispatch({ type: BY_NAME, payload: games });
  };
};

// mi actionCreator get por ID
export const getById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
    const game = apiData.data;
    // console.log(game);
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

export const setPage = (payload) => {
  return {type: SET_PAGE, payload}
}

export const resetPage = () => {
  return {type: RESET_PAGE, payload: 1}
}

export const backupPage = () => {
  return {type: GO_BACKUP_PAGE  }
}

// mi actionCreator filtrar por genero
// export const filterByGenre = (payload) => {
//   return { type: FILTER_BY_GENRE, payload  }
// };

// mi actionCreator para buscar por searchBar

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
      payload: payload
  }
}

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: []
}
}