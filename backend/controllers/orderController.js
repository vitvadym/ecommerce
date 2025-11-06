import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const createOrder = async (req, res, next) => {
  try {
    const { cartItems, amount, contactAddress } = req.body;
    const { id: userId } = req.user;

    const orderData = {
      userId,
      items: cartItems,
      contactAddress,
      amount,
    };

    const newOrder = new orderModel(orderData);
    const order = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: cartItems });

    res.json({ success: true, message: 'Order created', orderId: order._id });
  } catch (error) {
    next(error);
  }
};

const allOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

const userOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status Updated' });
  } catch (error) {
    next(error);
  }
};

export { createOrder, allOrders, userOrders, updateStatus };
