const { Genre } = require("../db");
const axios = require("axios");
const { KEY_API } = process.env;

const getAllGenres = async () => {
  const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${KEY_API}`);
  return apiGenres
};

module.exports = {getAllGenres}