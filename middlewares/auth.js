// middleware/authenticate.js

import jwt from 'jsonwebtoken';
import { User } from '../sequelize.js';

const authenticate = async (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authenticate;
