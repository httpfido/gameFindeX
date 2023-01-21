// - - - - - - - - - - - - - - - - -    ROUTERS PARA VIDEOGAMES    - - - - - - - - - - - - - - - - - - - - 
const { Router } = require("express");
const vGamesRouter = Router();
// importo los handlers
const  {
  getGamesHandler,
  getByIdHandler,
  createGameHandler,
} = require("../handlers/vgamesHandlers")

// Aca mis rutas
vGamesRouter.get("/", getGamesHandler);
vGamesRouter.get("/:id", getByIdHandler);
vGamesRouter.post("/", createGameHandler);


module.exports = vGamesRouter;
