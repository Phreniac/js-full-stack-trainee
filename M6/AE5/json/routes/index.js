const express = require('express');
const router = express.Router();
//importación del archivo con las rutas de game (crud)
const gameRoutes =  require('./Game');
const platformRoutes =  require('./Platform');
//se utilizan las rutas
router.use('/game', gameRoutes);
router.use('/platform', platformRoutes);
//exportación del modulo con rutas de game
module.exports = router;