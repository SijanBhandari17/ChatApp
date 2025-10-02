import User from '../models/userModel.js';

const handleUserSeach = async (req, res) => {
  const { email } = req.query;
  try {
    const users = await User.find({
      email: { $regex: email, $options: 'i' },
    })
      .limit(5)
      .select('userName profile_image email');
    if (!users.length) return res.status(200).json({ msg: 'No users found' });
    return res.status(200).json({ msg: 'Users Found', body: users });
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err.message}` });
  }
};

export default handleUserSeach;
