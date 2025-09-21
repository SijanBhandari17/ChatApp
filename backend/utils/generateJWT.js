const jwt = require('jsonwebtoken');

const generateJWT = ({ userName, email }) => {
  const accessToken = generateAccesToken({ userName, email });
  const refreshToken = generateRefreshToken({ userName, email });
  return { accessToken, refreshToken };
};

const generateAccesToken = ({ userName, email }) => {
  return jwt.sign(
    {
      email,
      userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10m',
    },
  );
};

const generateRefreshToken = ({ userName, email }) => {
  return jwt.sign(
    {
      userName,
      email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
  );
};

module.exports = generateJWT;
