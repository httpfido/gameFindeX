// - - - - - - - - - - - - - - - - -    ROUTERS PARA PLATFORMS    - - - - - - - - - - - - - - - - - - - - 
const { Router } = require("express");
const { getPlatformHandler } = require('../handlers/platformHandler')
const platformRouter = Router();

module.exports = platformRouter.get("/", getPlatformHandler);
