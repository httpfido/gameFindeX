import {
  GET_GAMES,
  BY_NAME,
  GET_GENRES,
  GET_PLATFORM,
  SEARCH_GAME,
  GET_ID,
  SET_PAGE,
  RESET_PAGE,
  GO_BACKUP_PAGE,
  FILTER_BY_GENRE,
  FILTER_BY_RATING,
  FILTER_BY_ABC,
  FILTER_CREATED,
  CLEAN_GAMES,
  CLEAN_DETAIL,

} from "./actions";

const initialState = {
  games: [],
  gamesBackup: [],
  game: [],
  searchGames: null,
  copyOfPlatform: [],
  copyOfGenres: [],
  currentPage: 1,
  currentPageBackup: 1,
  pointer: 0
};

export const searchVideoGame = (videoGames, gameSearch) => {
  const filtered = videoGames.filter((games) => games.name);
  return filtered;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_GAMES:

      return { ...state, games: action.payload };

    case BY_NAME:
      return { ...state, games: action.payload };

    case GET_ID:
      return { ...state, game: action.payload };

    case GET_GENRES:
      return { ...state, copyOfGenres: action.payload };

    case GET_PLATFORM:
      return { ...state, copyOfPlatform: action.payload };

    case SEARCH_GAME: 
      return {
        ...state,
        searchGames: action.payload,
      };
    
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        currentPageBackup: action.gamesLength > 90 ? action.payload : state.currentPageBackup
      };

    case RESET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case GO_BACKUP_PAGE:
      return {
        ...state,
        currentPage: state.currentPageBackup,
      };

    case FILTER_BY_GENRE:
      let juegos = action.payload;
      state.games = state.games.filter((videogames) => videogames.genres?.includes(juegos));
      if (action.payload === "all") state.games = state.allGames;
      if (state.games.length === 0) {
        state.games = state.allGames;
        alert("No hay resultados");
      }
      return {
        ...state,
        games: state.games,
      };

    case FILTER_BY_RATING:
      let sorted2 =
        action.payload === "desc"
          ? state.games.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            })
          : state.games.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        games: sorted2,
      };

    case FILTER_BY_ABC:
      let sorted =
        action.payload === "asc"
          ? state.games.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.games.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        games: sorted,
      };

    case FILTER_CREATED:
      const createdFilter =
        action.payload === "db"
          ? state.allGames.filter((e) => e.created)
          : state.allGames.filter((e) => !e.created);
      return {
        ...state,
        games: action.payload === "origin" ? state.allGames : createdFilter,
      };

    case CLEAN_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    
      case CLEAN_DETAIL:
      return {
        ...state,
        games: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;