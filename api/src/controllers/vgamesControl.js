// - - - - - - - - - - - - - - - -    CONTROLLERS PARA VIDEOGAMES    - - - - - - - - - - - - - - - - - - - -

const { Op } = require("sequelize");
const axios = require("axios");
const { Videogame } = require("../db");
const { API_KEY } = process.env;



// - - - - - - - - - - - - - - - - - - - - TRAER TODOS LOS JUEGOS - - - - - - - - - - - - - - - - - - - -

// traigo todos los videogames desde la API
const getAllGames = async () => {
  const getAll = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const gamesREADY = getAll.data.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((g) => g.name),
      created: false,
    };
  });
  return gamesREADY;
};


// concateno los videogames de la BDD con los de la API
const getAllGamesBDDAPI = async () => {
  const fromAPI = await getAllGames();
  const fromBDD = await Videogame.findAll();
  const BDDAPI = await fromBDD.concat(fromAPI).slice(0, 15);
  return BDDAPI;
};


// - - - - - - - - - - - - - - - - - - - - BUSCAR POR NOMBRE - - - - - - - - - - - - - - - - - - - -

// busca en la API
const findGamesAPI = async (name) => {
  const api = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );
  const gamesREADY = api.data.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((g) => g.name),
      created: false,
    };
  });
  return gamesREADY;
};
 
// busca en la BDD
const findGamesBDD = async (name) => {
  let result = await Videogame.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  });

  if (result.length === 0) return (result = null);
  else return result;
};

// concatena BDD y API
const findGames = async (name) => {
  const bdd = await findGamesBDD(name);
  const api = await findGamesAPI(name);

  if (api.length === 0 && !bdd) throw Error("No se encontro el juego");
  else if (!bdd) return api.slice(0, 15);

  return [...bdd, ...api].slice(0, 15);
};


// - - - - - - - - - - - - - - - - - - - - BUSCAR POR ID - - - - - - - - - - - - - - - - - - - -

// busca el juego por NAME solamente en la API
const findByIdAPI = async (id) => {
  try {
    const game = (
      await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    ).data;
    const result = {
      id: game.id,
      name: game.name,
      description: game.description,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((g) => g.name),
      created: false,
    };

    return result;
  } catch (error) {
    throw Error("No se encontro el juego");
  }
};

// busca el juego por NAME solamente en la BDD
const findByIdBDD = async (id) => {
  const result = await Videogame.findAll({ where: { id } });
  return result;
};

// findbyID funciona de spliter. Señala si buscar en BDD o API
const findById = async (id, source) => {
  const result =
    source === "api" ? await findByIdAPI(id) : await findByIdBDD(id);
  return result;
};


// - - - - - - - - - - - - - - - - - - - - CREAR NUEVO JUEGO - - - - - - - - - - - - - - - - - - - -

// createGame crea el juego. Se asegura de que no exista ningun juego con el mismo nombre en API
const createGame = async (
  name,
  description,
  releaseDate,
  rating,
  platforms
) => {
  const api = await getAllGames();
  const apiFilter = api.filter((game) => game.name === name);
  if (apiFilter.length !== 0) throw Error("Ya existe un juego con ese nombre");
  const createGame = await Videogame.create({
    name,
    description,
    releaseDate,
    rating,
    platforms,
  });
  return createGame;
};

module.exports = {
  getAllGamesBDDAPI,
  findGames,
  findById,
  createGame,
};
