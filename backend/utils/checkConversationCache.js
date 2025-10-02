import { redisClient } from '../config/redis.js';
import generateNumber from '../utils/contorPairing.js';

const checkConversationCache = async participants => {
  try {
    if (!participants) {
      return res.status(400).json({ error: 'Missing participants' });
    }
    const key = `conversation:${generateNumber(participants)}`;
    const conversationId = await redisClient.get(key);

    if (conversationId) {
      return conversationId;
    }
    return null;
  } catch (err) {
    console.error(err.msg);
  }
};

export default checkConversationCache;
