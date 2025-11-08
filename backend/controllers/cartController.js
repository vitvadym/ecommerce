import userModel from '../models/userModel.js';

const getUserCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    next(error);
  }
};

export { getUserCart };
