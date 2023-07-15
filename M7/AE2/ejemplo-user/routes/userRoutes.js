import express from 'express';
import {createUser, getAllUsers, updateUser, deleteUser} from '../controller/userController.js';


const router = express.Router();

router.post('/create',createUser);
router.get('/getall', getAllUsers);
router.put('/update/:id_user', updateUser);
router.delete('/delete/:id_user', deleteUser);
export default router;