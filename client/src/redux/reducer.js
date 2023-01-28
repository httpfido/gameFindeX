import { GET_GAMES, GET_GAME, GET_GENRES, GET_PLATFORM } from "./actions";

const initialState = {
  games: [],
  game: [],
  copyOfGames: [],
  filters: [],
  copyOfPlatform: [],
  copyOfGenres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, games: action.payload };

    case GET_GAME:
      return { ...state, game: action.payload };

    case GET_GENRES:
      return { ...state, copyOfGenres: action.payload };

      case GET_PLATFORM:
      return { ...state, copyOfPlatform: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
