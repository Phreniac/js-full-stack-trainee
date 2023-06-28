const express = require('express');
const router = express.Router();
//importación del archivo con las rutas de usuario (crud)
const userRoutes =  require('./usuario/Usuario');

//se utilizan las rutas
router.use('/user', userRoutes);

//exportación del modulo con rutas de usuario
module.exports = router;