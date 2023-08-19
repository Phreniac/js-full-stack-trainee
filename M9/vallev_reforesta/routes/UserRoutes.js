import express from 'express';
import {crearUsuario, actualizarUsuario, loginUsuario} from '../controller/UserController.js';


const router = express.Router();

router.post('/crear',crearUsuario);
router.put('/actualizar/:id_usuario',actualizarUsuario);
router.post('/login',loginUsuario);

export default router;