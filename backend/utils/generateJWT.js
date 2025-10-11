import jwt from 'jsonwebtoken';

const generateJWT = ({ userName, email, id }) => {
  const accessToken = generateAccessToken({ userName, email, id });
  const refreshToken = generateRefreshToken({ userName, email, id });
  return { accessToken, refreshToken };
};

const generateAccessToken = ({ userName, email, id }) => {
  return jwt.sign({ email, userName, id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
};

const generateRefreshToken = ({ userName, email, id }) => {
  return jwt.sign({ userName, email, id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

export default generateJWT;
