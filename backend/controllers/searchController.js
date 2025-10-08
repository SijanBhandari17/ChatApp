import User from '../models/userModel.js';

const handleUserSeach = async (req, res) => {
  const { email } = req.query;
  const { email: userEmail } = req.user;
  try {
    const users = await User.find(
      {
        $and: [{ email: { $regex: email, $options: 'i' } }, { email: { $ne: userEmail } }],
      },
      { password: 0, refresh_token: 0 },
    )
      .limit(9)
      .select('_id userName profile_image email');

    if (!users.length) return res.status(200).json({ msg: 'No users found' });
    return res.status(200).json({ msg: 'Users Found', body: users });
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err.message}` });
  }
};

export default handleUserSeach;
