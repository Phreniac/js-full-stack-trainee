import express from 'express';
import {createMovie} from '../controller/movieController.js';

const router = express.Router();

router.post('/create',createMovie);


export default router;