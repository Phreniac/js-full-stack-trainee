import express from 'express';
import {createUsersMovies} from '../controller/usersMoviesController.js';

const router = express.Router();

router.post('/create',createUsersMovies);


export default router;