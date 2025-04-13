import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log('Auth Headers:', req.headers.authorization);
  console.log('Cookies:', req.cookies);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Using token from header:', token.substring(0, 10) + '...');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully:', decoded);

      // Get user from the token
      const user = await User.findById(decoded.userId).select('-password');
      console.log(
        'User lookup result:',
        user
          ? {
              id: user._id,
              username: user.username,
              isAdmin: user.isAdmin,
            }
          : 'No user found'
      );

      if (!user) {
        console.error('User not found in database for ID:', decoded.userId);
        res.status(401);
        throw new Error('User not found');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else if (req.cookies.jwt) {
    try {
      // Get token from cookie
      token = req.cookies.jwt;
      console.log('Using token from cookie:', token.substring(0, 10) + '...');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully:', decoded);

      // Get user from the token
      const user = await User.findById(decoded.userId).select('-password');
      console.log(
        'User lookup result:',
        user
          ? {
              id: user._id,
              username: user.username,
              isAdmin: user.isAdmin,
            }
          : 'No user found'
      );

      if (!user) {
        console.error('User not found in database for ID:', decoded.userId);
        res.status(401);
        throw new Error('User not found');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Cookie verification failed:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    console.log('No token found in request');
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Check if user is an admin
const admin = (req, res, next) => {
  console.log(
    'Checking admin status for user:',
    req.user
      ? {
          id: req.user._id,
          username: req.user.username,
          isAdmin: req.user.isAdmin,
        }
      : 'No user in request'
  );

  if (req.user && req.user.isAdmin) {
    console.log('User is admin, proceeding');
    next();
  } else {
    console.log('User is not admin or not found:', req.user);
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
