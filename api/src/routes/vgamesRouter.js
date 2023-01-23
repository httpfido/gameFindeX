// - - - - - - - - - - - - - - - - -    ROUTERS PARA VIDEOGAMES    - - - - - - - - - - - - - - - - - - - - 
const { Router } = require("express");
const vGamesRouter = Router();
// importo los handlers
const  {
  getGamesHandler,
  getByIdHandler,
  createGameHandler,
} = require("../handlers/vgamesHandlers")
const validate = require('./validatevGame');

// Aca mis rutas
vGamesRouter.get("/", getGamesHandler);
vGamesRouter.get("/:id", getByIdHandler);
vGamesRouter.post("/", validate,  createGameHandler);


module.exports = vGamesRouter;
