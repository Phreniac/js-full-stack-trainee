const express = require('express');
const router = express.Router();
//importación del archivo con las rutas de usuario (crud)
const booksRoutes =  require('./Books');

//se utilizan las rutas
router.use('/book', booksRoutes);

//exportación del modulo con rutas de usuario
module.exports = router;