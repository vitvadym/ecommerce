import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import createToken from '../utils/createTokten.js';
import hashPassword from '../utils/hashPassword.js';
import ApiError from '../utils/apiError.js';
import verifyToken from '../utils/vefifyToken.js';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(new ApiError('User not found, please sign up', 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ApiError('Invalid credentials', 401));
    }

    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
      email: user.email,
    };

    const token = createToken(payload);

    res.json({ success: true, token, user: payload });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return next(new ApiError('User already exists', 400));
    }

    if (!validator.isEmail(email)) {
      return next(new ApiError('Please enter a valid email', 400));
    }
    if (password.length < 8) {
      return next(new ApiError('Please enter a strong password', 400));
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
      email: user.email,
    };
    const token = createToken(payload);

    res.json({ success: true, token, user: payload });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await verifyToken(token);

    const existUser = await userModel.findById(decoded.id);
    if (!existUser) {
      return res.json({ success: true, user: null });
    }

    const user = {
      id: existUser._id,
      isAdmin: existUser.isAdmin,
      email: existUser.email,
    };

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export { login, register, me };
