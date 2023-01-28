const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const vGamesRouter = require('./vgamesRouter.js');
const genreRouter = require('./genreRouter.js');
const platformRouter = require('./platformRouter')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", vGamesRouter);
router.use("/genres", genreRouter);
router.use("/platforms", platformRouter);

module.exports = router;

