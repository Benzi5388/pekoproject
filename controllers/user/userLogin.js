import bcrypt from 'bcrypt';
import UserRepository from '../../repository/UserRepository.js';
import jwt from 'jsonwebtoken';

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    if (req.session) {
      req.session.token = token;
    } else {
      throw new Error('Session object not available');
    }

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
