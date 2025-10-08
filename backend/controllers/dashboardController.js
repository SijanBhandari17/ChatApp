import mongoose from 'mongoose';
import Conversation from '../models/conversationModel.js';
import User from '../models/userModel.js';

const getConversations = async (req, res) => {
  const { userId } = req.user;
  if (!userId) return res.status(400).json({ error: 'No user found' });

  try {
    const usersConversations = await Conversation.aggregate([
      { $match: { 'participants.user_id': new mongoose.Types.ObjectId(userId) } },
      { $sort: { 'last_message.createdAt': -1 } },
      { $limit: 15 },
      {
        $lookup: {
          from: 'users',
          let: { participantsIds: '$participants.user_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ['$_id', '$$participantsIds'] },
                    { $ne: ['$_id', new mongoose.Types.ObjectId(userId)] },
                  ],
                },
              },
            },
            { $project: { password: 0, refresh_token: 0 } },
          ],
          as: 'recipient',
        },
      },
    ]);
    console.log(usersConversations);

    return res.status(200).json({
      message: 'Conversations returned successfully',
      body: usersConversations,
    });
  } catch (err) {
    return res.status(500).json({ error: `An error occurred : ${err.message}` });
  }
};

const getUserInfo = async (req, res) => {
  const { userId } = req.user;
  if (!userId) return res.status(400).json({ error: 'No user found' });
  try {
    const userInfo = await User.findById(userId, { password: 0, refresh_token: 0 });

    if (!userInfo) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({
      message: 'User info send successfully',
      body: userInfo,
    });
  } catch (err) {
    return res.status(500).json({ error: `An error occurred : ${err.message}` });
  }
};

export { getConversations, getUserInfo };
