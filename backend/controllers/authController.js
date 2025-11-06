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
    };

    const token = createToken(payload);

    res.json({ success: true, token, user: user._id });
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
    const payload = { id: user._id };
    const token = createToken(payload);

    res.json({ success: true, token, user: user._id });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await verifyToken(token);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.json({ success: true, user: null });
    }

    res.json({ success: true, user: decoded.id });
  } catch (error) {
    next(error);
  }
};

export { login, register, me };
