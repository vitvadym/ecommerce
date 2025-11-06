import express from 'express';
import * as orderController  from '../controllers/orderController.js';
import isAdmin from '../middleware/isAdmin.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post('/list', isAdmin, orderController.allOrders);
router.post('/status', isAdmin, orderController.updateStatus);

router.post('/create', isAuth, orderController.createOrder);

router.get('/user-orders', isAuth, orderController.userOrders);

export default router;
