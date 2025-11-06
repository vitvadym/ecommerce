import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post('/checkout-session', isAuth, paymentController.createCheckoutSession);
router.post('/checkout-success', isAuth, paymentController.checkoutSuccess);
router.post('/checkout-cancel', isAuth, paymentController.checkoutCancel);
router.post('/retry-checkout', isAuth, paymentController.retryPayment);

export default router;
