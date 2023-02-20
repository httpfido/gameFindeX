// - - - - - - - - - - - - - - - -    CONTROLLERS PARA VIDEOGAMES    - - - - - - - - - - - - - - - - - - - -

const { Op } = require("sequelize");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

// me voy a auxiliar con una funcion que me va a devolver de manera prolija los generos cada juego de BDD

const genreMap = async (games) => {
  const result = await games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
      platform: game.platform,
      created: game.created,
    };
  });
  return result;
};

// - - - - - - - - - - - - - - - - - - - - TRAER TODOS LOS JUEGOS - - - - - - - - - - - - - - - - - - - -


// traigo todos los videogames desde la API
const getAllAPI = async () => {
  const oneHundredGames = [];

  for (let i = 1; i <= 8; i++) {
    let api = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    api.data.results.map((game) => {
      oneHundredGames.push({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        genres: game.genres.map((g) => g.name),
        released: game.released,
        rating: game.rating,
        platform: game.platforms.map((p) => p.platform.name),
        created: false,
      });
    });
  }
  return oneHundredGames;
};

// traigo todos los videogames desde la BDD
const getAllBDD = async () => {
  const allGames = await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const mapped = await genreMap(allGames);
  return mapped;
};

// concateno los videogames de la BDD con los de la API
const getAllGamesBDDAPI = async () => {
  const fromAPI = await getAllAPI();
  const fromBDD = await getAllBDD();
  const BDDAPI = fromBDD.concat(fromAPI);
  return BDDAPI;
};

// - - - - - - - - - - - - - - - - - - - - BUSCAR POR NOMBRE - - - - - - - - - - - - - - - - - - - -

// busca en la API
const findGamesAPI = async (name) => {
  const sixtyGames = [];
  for (let i = 1; i <= 7; i++) {
    let api = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page=${i}`
    );
    api.data.results.map((game) => {
      sixtyGames.push({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        genres: game.genres?.map((g) => g.name),
        released: game.released,
        rating: game.rating,
        platform: game.platforms?.map((p) => p.platform.name),
        created: false,
      });
    });
  }
  return sixtyGames;
};

// busca en la BDD
const findGamesBDD = async (name) => {
  let game = await Videogame.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const result = await genreMap(game);
  return result;
};

// concatena BDD y API
const findGames = async (name) => {
  const bdd = await findGamesBDD(name);
  const api = await findGamesAPI(name);
  
  if (!api && !bdd) throw Error("No se encontro el juego");
  
  return [...bdd, ...api];
};

// - - - - - - - - - - - - - - - - - - - - BUSCAR POR ID - - - - - - - - - - - - - - - - - - - -

// busca el juego por ID solamente en la API
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
      background_image_additional: game.background_image_additional,
      rating: game.rating,
      genres: game.genres?.map((g) => g.name),
      released: game.released,
      developers: game.developers?.map((d) => d.name),
      esrb: game.esrb_rating?.name,
      tags: game.tags?.map((t) => t.name).slice(0,9),
      platform: game.platforms?.map((p) => p.platform.name),
      comments: game.ratings?.map((r) => `${r.title} (${r.count})` ),
      created: false,
    };
    
    return result;
  } catch (error) {
    throw Error("No se encontro el juego");
  }
};

// busca el juego por ID solamente en la BDD
const findByIdBDD = async (id) => {
  const result = await Videogame.findAll({
    where: { id },
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const mapped = await genreMap(result);
  return mapped;
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
  background_image,
  description,
  released,
  genres,
  rating,
  platform) => {
  const api = await getAllAPI();
  const apiFilter = api.filter((game) => game.name === name);
  if (apiFilter.length !== 0) throw Error("Ya existe un juego con ese nombre");
  const createGame = await Videogame.create({
    name,
    background_image,
    description,
    released,
    rating,
    platform
  });

  const genreBDD = await Genre.findAll({
    where: {
      name: genres,
    },
  });

  createGame.addGenre(genreBDD);
  return createGame;
};

module.exports = {
  getAllGamesBDDAPI,
  findGames,
  findById,
  createGame,
};
