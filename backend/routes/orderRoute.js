import express from 'express';
import * as orderController from '../controllers/orderController.js';
import isAdmin from '../middleware/isAdmin.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.get('/all-orders', isAuth, isAdmin, orderController.allOrders);
router.post('/create', isAuth, orderController.createOrder);
router.get('/user-orders', isAuth, orderController.userOrders);

export default router;
