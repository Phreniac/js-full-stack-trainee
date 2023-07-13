import express from 'express';
import studentRoutes from './studentRoutes.js';

const router = express.Router();

router.use('/student', studentRoutes);

export default router;
