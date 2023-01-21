require("dotenv").config();
const { Router } = require('express');
const axios= require('axios');
const { Videogame, Genre, Platform} = require('../db')
const {API_KEY} = process.env
const router = Router();


const getAllGenres = async () => {
    const apiGenres = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results

    const genresName = apiGenres.map(g => g.name)


    await genresName.map(async (g,i) => {
      // busca un objeto "genre" con el mismo nombre en la base de datos
      // si no existe, crea uno nuevo con el nombre especificado
      await Genre.findOrCreate({
        where: {name: g},
        defaults: {id: i+1}
      }); 
    });

    const AllGenresOnDb = Genre.findAll()

    return AllGenresOnDb
  }

  module.exports = {getAllGenres}