import express from 'express';
import {
  placeOrder,
  placeOrderStripe,
  // placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  // verifyStripe,
  // verifyRazorpay,
} from '../controllers/orderController.js';
import isAdmin from '../middleware/isAdmin.js';
import isAuth from '../middleware/isAuth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', isAdmin, allOrders);
orderRouter.post('/status', isAdmin, updateStatus);

// Payment Features
orderRouter.post('/place', isAuth, placeOrder);
orderRouter.post('/stripe', isAuth, placeOrderStripe);
// orderRouter.post('/razorpay', isAuth, placeOrderRazorpay);

// User Feature
orderRouter.post('/userorders', isAuth, userOrders);

// verify payment
// orderRouter.post('/verifyStripe', authUser, verifyStripe);
// orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default orderRouter;
