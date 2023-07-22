import express from 'express';
import {createStudent, getAllStudents} from '../controller/studentController.js';


const router = express.Router();

router.post('/create',createStudent);
router.get('/getall',getAllStudents);

export default router;