import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_BACKUP = "GET_BACKUP";
export const BACK_TO_ALL = "BACK_TO_ALL";
export const BY_NAME = "BY_NAME";
export const GET_ID = "GET_ID";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORM = "GET_PLATFORM";
export const SET_PAGE = "SET_PAGE"
export const RESET_PAGE = "RESET_PAGE"
export const GO_BACKUP_PAGE = "GO_BACKUP_PAGE"
export const SEARCH_GAME = "SEARCH_GAME"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const ORDER = "ORDER";
export const SET_SOURCE = "SET_SOURCE";
export const CLEAN_SOURCE = "CLEAN_SOURCE";
export const FILTER_BY_GENRE_DETAIL = "FILTER_BY_GENRE_DETAIL"
export const FILTER_BY_RATING = "FILTER_BY_RATING"
export const FILTER_BY_ABC = "FILTER_BY_ABC"
export const FILTER_CREATED = "FILTER_CREATED"
export const CLEAN_GAMES = "CLEAN_GAMES"
export const POINTER = "POINTER"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const CLEAN_ORDER = "CLEAN_ORDER"


// los dispatch se hacen desde los componentes
// mi actionCreator de allgames Y get por NAME
export const getGames = (name) => {
  return async function (dispatch) {
    const apiData = name ? await axios.get(`http://localhost:3001/videogames?name=${name}`)
    : await axios.get("http://localhost:3001/videogames/");
    const results = apiData.data;
    dispatch({ type: GET_GAMES, payload: results });
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

export const backToAllGames = () => {
  return {type: BACK_TO_ALL}
}
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

export const setSource = (payload) => {
  return {
      type: SET_SOURCE,
      payload: payload
  }
}
export const cleanSource = () => {
  return {
      type: SET_SOURCE,
      payload: "reset"
  }
}

export const filterByGenreDetail = (payload) => {
  return {
      type: FILTER_BY_GENRE_DETAIL,
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

export const cleanGames = () => {
  return {
    type: CLEAN_GAMES,
    payload: []
}
}

export const getBackup = () => {
  return {
    type: GET_BACKUP,
    payload: []
}
}

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: []
}
}

export const setOrder = (payload) => {
  return {
    type: ORDER,
    payload
  }
}
export const cleanOrder = () => {
  return {
    type: CLEAN_ORDER
  }
}