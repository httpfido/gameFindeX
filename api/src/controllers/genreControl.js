const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

const getAllGenres = async () => {
  const getGenres = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );

  // Lo guardo en mi db con el nombre
  const genresAPI = await getGenres.data.results.map((g) => g.name);
  genresAPI.forEach((g) => {
    Genre.findOrCreate({ where: { name: g } });
  });
  // Retorno todos los generos de mi db
  let genresBDD = await Genre.findAll();
  return genresBDD;
};

module.exports = { getAllGenres };
