import { redisClient } from '../config/redis.js';
import checkConversationCache from '../utils/checkConversationCache.js';
import Conversation from '../models/conversationModel.js';
import generateNumber from '../utils/contorPairing.js';

const getOrCreateDirectConversation = async (req, res, next) => {
  const { conversation_type, participants } = req.body;

  if (!conversation_type) {
    return res.status(400).json({ error: 'Missing field: type' });
  }

  if (!participants) {
    return res.status(400).json({ error: 'Missing field: participants' });
  }
  try {
    const existingId = await checkConversationCache(participants);
    if (existingId) {
      req.conversation_id = existingId;
      console.log('conversation in cache:', existingId);
      return next();
    }
    const existingConversation = await Conversation.findOne({
      conversation_type,
      participants: {
        $all: [
          { $elemMatch: { user_id: participants[0] } },
          { $elemMatch: { user_id: participants[1] } },
        ],
      },
    });

    if (existingConversation) {
      const key = `conversation:${generateNumber(participants)}`;
      await redisClient.set(key, existingConversation._id.toString());
      console.log('existing conversation :', existingConversation._id);
      req.conversation_id = existingConversation._id.toString();
      return next();
    }

    const newConversation = await Conversation.create({
      conversation_type,
      participants: [{ user_id: participants[0] }, { user_id: participants[1] }],
    });

    const key = `conversation:${generateNumber(participants)}`;
    await redisClient.set(key, newConversation._id.toString());
    console.log('conversation :', newConversation._id);

    req.conversation_id = newConversation._id.toString();
    return next();
  } catch (err) {
    return res.status(500).json({ error: `An error occurred here: ${err.message}` });
  }
};

export default getOrCreateDirectConversation;
