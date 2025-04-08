import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  console.log('JWT_SECRET from env:', process.env.JWT_SECRET);
  console.log('userId:', userId);

  // Use a hardcoded secret temporarily for testing
  const secret = process.env.JWT_SECRET || 'jotbikes_secret_key_2024';
  console.log('Using secret:', secret);

  const token = jwt.sign({ userId }, secret, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  return token;
};

export default generateToken;
