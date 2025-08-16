import { HTTP_STATUS } from '../config/constants.js';
import User from '../models/User.model.js';
import errorResponse from '../utils/errorResponse.js';
import generateToken from '../utils/generateToken.js';
import successResponse from '../utils/successResponse.js';

export const registerUser = async (req, res, next) => {
  try {
    console.log("entered registered user.")
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorResponse(res, HTTP_STATUS.CONFLICT, 'Email already in use');
    }

    const user = await User.create({ firstName, lastName, email, password });

    generateToken(res, user._id);

    return successResponse(res, HTTP_STATUS.CREATED, 'User registered successfully', {
      _id: user._id,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    console.log("req body", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token =generateToken(res, user._id);

      return successResponse(
        res,
        HTTP_STATUS.OK,
        "User logged in successfully!",
        {
          _id: user._id,
          email: user.email,
          role: user.role,
          token
        }
      );
    }

    return errorResponse(res, HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
  } catch (err) {
    next(err);
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  
  return successResponse(res, HTTP_STATUS.OK, 'Logged out successfully');
};