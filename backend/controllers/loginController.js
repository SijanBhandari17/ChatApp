import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateJWT from '../utils/generateJWT.js';
import { validationResult, matchedData } from 'express-validator';

const handleLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { email, password } = matchedData(req);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: { msg: 'Incorrect Email or Password' } });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ error: { msg: 'Incorrect Email or Password' } });

    const { accessToken, refreshToken } = generateJWT({
      email: user.email,
      userName: user.userName,
      id: user._id,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    user.refresh_token = refreshToken;
    await user.save();
    const { password: _, refresh_token, ...userData } = user.toObject();
    return res.status(200).json({ message: 'Successful login', body: userData, accessToken });
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err.message}` });
  }
};

export default handleLogin;
