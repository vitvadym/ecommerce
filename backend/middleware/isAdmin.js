import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new ApiError('Token not found', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return next(new ApiError('Access denied', 403));
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
