// - - - - - - - - - - - - - - - - -    HANDLERS PARA VIDEOGAMES    - - - - - - - - - - - - - - - - - - - - 
const {
  getAllGamesBDDAPI,
  findGames,
  findById,
  createGame,
} = require("../controllers/vgamesControl");


// busco videogames por NAME
const getGamesHandler = async (req, res) => {
  const { name } = req.query;
  
  try {
    const result = name ? await findGames(name) : await getAllGamesBDDAPI();
    if(result.length === 0) throw Error("No se encontro el juego")
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message});
  }
};


// busco videogames por ID
const getByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const result = await findById(id, source);
    if(result.length === 0) throw Error("No se encontro el juego")
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
 

// creo un videogame en la BDD
const createGameHandler = async (req, res) => {
  const {name, description, released, genres, rating, platforms} = req.body;
  try {
    const newGame = await createGame(name, description, released, genres, rating, platforms)
    return res.status(201).json(newGame)
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getGamesHandler,
    getByIdHandler,
    createGameHandler,
}