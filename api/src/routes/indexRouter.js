const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const vGamesRouter = require('./vgamesRouter.js');
const genreRouter = require('./genreRouter.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", vGamesRouter);
router.use("/genre", genreRouter);

module.exports = router;

