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
    const page = req.query.page || 1;
    const limit = 7;
    const skip = (page - 1) * limit;

    const totalOrders = await orderModel.countDocuments({});
    const totalPages = Math.ceil(totalOrders / limit);

    const orders = await orderModel
      .find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.json({ success: true, orders, totalPages });
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

export { createOrder, allOrders, userOrders };
