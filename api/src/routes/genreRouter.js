const { Router } = require("express");
const { getGenresHandler } = require("../handlers/genresHandlers");
const genreRouter = Router();


genreRouter.get("/", getGenresHandler);

module.exports = genreRouter;
