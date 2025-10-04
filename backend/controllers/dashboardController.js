import Conversation from '../models/conversationModel.js';
import User from '../models/userModel.js';

const getConversations = async (req, res) => {
  const { userId } = req.user;
  console.log(req.user);
  if (!userId) return res.status(400).json({ error: 'No user found' });
  try {
    const usersConversations = await Conversation.aggregate([
      { $match: { 'participants.user_id': userId } },
      { $limit: 15 },
      {
        $cond: {
          if: { $eq: ['conversation_type', 'direct'] },
          then: {
            $lookup: {
              from: 'user',
              localField: { 'participants.user_id': { $ne: userId } },
              foreignField: '_id',
              as: 'other_participant_detail',
            },
          },
        },
      },
    ]);

    // const usersConversationsArray = usersConversations.map(conv => conv.toObject());
    // const allDirectConversations = await Promise.all(
    //   usersConversationsArray
    //     .filter(conversation => conversation.conversation_type === 'direct')
    //     .map(async conversation => {
    //       const otherParticipantId = conversation.participants.filter(
    //         user => user.user_id !== userId,
    //       );
    //       const participantInfo = await User.findOneById({ otherParticipantId }).select(
    //         'email userName last_active_at profile_image',
    //       );
    //       return { ...conversation, otherParticipant: participantInfo };
    //     }),
    // );
    // const conversationArray = [...usersConversationsArray, ...allDirectConversations];
    // conversationArray.sort((a, b) => b.last_message.created_at - a.last_message.created_at);

    console.log(JSON.stringify(usersConversations, null, 2));
  } catch (err) {
    return res.status(500).json({ error: `An error occurred : ${err.message}` });
  }
};

export { getConversations };
