import express from 'express';
import {
  addToCart,
  getUserCart,
  updateCart,
} from '../controllers/cartController.js';
import isAuth from '../middleware/isAuth.js';

const cartRouter = express.Router();

cartRouter.post('/get', isAuth, getUserCart);
cartRouter.post('/add', isAuth, addToCart);
cartRouter.post('/update', isAuth, updateCart);

export default cartRouter;
