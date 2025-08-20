import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { HTTP_STATUS } from '../config/constants.js';
import errorResponse from '../utils/errorResponse.js';

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; 
  }
  // Also check for token in cookies as fallback
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  console.log("extracted token is: ", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded: ", decoded)
      req.user = await User.findById(decoded.userId).select('-password');
      return next();
    } catch (err) {
      return errorResponse(res, HTTP_STATUS.UNAUTHORIZED, 'Not authorized, token failed');
    }
  }

  return errorResponse(res, HTTP_STATUS.UNAUTHORIZED, 'Not authorized, no token');
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return errorResponse(res, HTTP_STATUS.FORBIDDEN, 'Admin access only');
};

export { protect, adminOnly };