import express from 'express';
import {createUser, getAllUsers, updateUser, deleteUser, loginUser} from '../controller/userController.js';

const router = express.Router();
//dominio/user/crud
router.post('/login', loginUser)
router.post('/create',createUser);
router.get('/getall', getAllUsers);
router.put('/update/:id_user', updateUser);
router.delete('/delete/:id_user', deleteUser);

export default router;