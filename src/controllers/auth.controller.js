import User from '../models/User.model.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res, next) => {
  try {
    console.log("entered registered user.")
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.create({ firstName, lastName, email, password });

    generateToken(res, user._id); // Set JWT cookie

    res.status(201).json({
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      return res.json({ _id: user._id, email: user.email, role: user.role });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out successfully' });
};
