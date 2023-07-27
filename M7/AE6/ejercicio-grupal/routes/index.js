//importa dependencias
import express from 'express';
import libroRoutes from './libroRoutes.js';

//se crea constante para el uso del router
const router = express.Router();
//se importa y define la ruta "/user" para el crud de usuario
router.use('/libro', libroRoutes);

//se exporta el router luego de la definición de las rutas
export default router;
