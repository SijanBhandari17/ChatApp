import User from '../models/userModel.js';

const setLastSeen = async userId => {
  if (!userId) {
    console.log('userId not present');
    return;
  }
  try {
    const user = await User.findById(userId);
    console.log({ user });
    user.last_active_at = new Date();
    user.save();
  } catch (err) {
    console.log(err);
  }
};

export default setLastSeen;
