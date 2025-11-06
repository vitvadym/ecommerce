import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const clientURL = process.env.CLIENT_URL;

const createCheckoutSession = async (req, res, next) => {
  try {
    const { cartItems, contactAddress, orderId } = req.body;
    const { id: userId } = req.user;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: `${clientURL}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${clientURL}/checkout?success=false&session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: contactAddress.email,
      billing_address_collection: 'auto',
      metadata: {
        contactAddress: JSON.stringify(contactAddress),
        userId,
      },
      customer_creation: 'if_required',
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    next(error);
  }
};

const checkoutSuccess = async (req, res, next) => {
  const { sessionId, orderId } = req.body;
  const userId = req.user.id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const status = session.payment_status;

    if (session && status === 'paid') {
      await orderModel.findByIdAndUpdate(orderId, {
        sessionId: session.id,
        success: true,
        status,
      });

      await userModel.findByIdAndUpdate(userId, { cartData: {} });
    }

    res.json({ success: true, message: 'Checkout success', session });
  } catch (error) {
    next(error);
  }
};

const checkoutCancel = async (req, res, next) => {
  try {
    const { sessionId, orderId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session) {
      const status = session.payment_status;

      await orderModel.findByIdAndUpdate(orderId, {
        sessionId: session.id,
        success: false,
        status,
      });
    }

    res.json({ success: true, message: 'Checkout canceled', session });
  } catch (error) {
    next(error);
  }
};

const retryPayment = async (req, res, next) => {
  try {
    const { sessionId, orderId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session && session.status === 'open') {
      res.json({ success: true, session_url: session.url });
    } else {
      res.json({
        success: false,
        message: 'Cannot retry payment for this session',
      });
    }
  } catch (error) {
    next(error);
  }
};

export { createCheckoutSession, checkoutSuccess, checkoutCancel, retryPayment };
