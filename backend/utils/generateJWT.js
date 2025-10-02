import jwt from 'jsonwebtoken';

const generateJWT = ({ userName, email }) => {
  const accessToken = generateAccessToken({ userName, email });
  const refreshToken = generateRefreshToken({ userName, email });
  return { accessToken, refreshToken };
};

const generateAccessToken = ({ userName, email }) => {
  return jwt.sign({ email, userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

const generateRefreshToken = ({ userName, email }) => {
  return jwt.sign({ userName, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

export default generateJWT;
