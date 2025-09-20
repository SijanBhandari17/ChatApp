const jwt = require('jsonwebtoken');

const generateJWT = ({ userName, email }) => {
  const accessToken = jwt.sign(
    {
      email,
      userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10m',
    },
  );

  const refreshToken = jwt.sign(
    {
      userName,
      email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
  );
  return { accessToken, refreshToken };
};

module.exports = generateJWT;
