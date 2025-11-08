import express from 'express';
import { getUserCart } from '../controllers/cartController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post('/get', isAuth, getUserCart);

export default router;
