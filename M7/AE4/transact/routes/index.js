//importa dependencias
import express from 'express';
import userRoutes from './userRoutes.js';
import tradingRoutes from './tradingRoutes.js';
//se crea constante para el uso del router
const router = express.Router();
//se importa y define la ruta "/user" para el crud de usuario
router.use('/user', userRoutes);
router.use('/trading', tradingRoutes);
//se exporta el router luego de la definición de las rutas
export default router;
