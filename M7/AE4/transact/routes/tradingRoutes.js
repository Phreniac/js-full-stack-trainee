import express from 'express';
import { createTrade } from '../controller/tradingController.js';

const router = express.Router();

router.post('/card', createTrade)


export default router;