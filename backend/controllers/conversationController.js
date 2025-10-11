import { redisClient } from '../config/redis.js';
import checkConversationCache from '../utils/checkConversationCache.js';
import Conversation from '../models/conversationModel.js';
import generateKey from '../utils/generateConversationKey.js';
import { validationResult, matchedData } from 'express-validator';

const getOrCreateDirectConversation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { participants } = matchedData(req);

  try {
    // const existingId = await checkConversationCache(participants);
    // if (existingId) {
    //   return res.status(200).json({
    //     message: 'Conversation id found',
    //     body: { conversation_id: JSON.parse(existingId) },
    //   });
    // }

    const existingConversation = await Conversation.findOne({
      participants: {
        $all: [
          { $elemMatch: { user_id: participants[0] } },
          { $elemMatch: { user_id: participants[1] } },
        ],
      },
    });

    if (existingConversation) {
      const key = generateKey(participants);
      await redisClient.set(key, JSON.stringify(existingConversation._id));
      return res.status(200).json({
        message: 'Conversation id found',
        body: { conversation_id: JSON.parse(existingConversation.toObject()) },
      });
    }

    const newConversation = await Conversation.create({
      conversation_type: 'direct',
      participants: [{ user_id: participants[0] }, { user_id: participants[1] }],
    });

    const key = generateKey(participants);
    await redisClient.set(key, JSON.stringify(newConversation._id));
    return res.status(200).json({
      message: 'Conversation id found',
      body: { conversation_id: newConversation.toObject() },
    });
  } catch (err) {
    return res.status(500).json({ error: `An error occurred : ${err.message}` });
  }
};

const createGroupConversation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { participants, created_by, title } = matchedData(req);
  try {
    const insertionResult = await Conversation.create({
      title,
      conversation_type: 'group',
      created_by,
      participants: participants.map(participant => ({
        user_id: participant,
        role: participant == created_by ? 'admin' : 'member',
      })),
    });

    return res
      .status(201)
      .json({ message: 'Succesful coversation creation', body: insertionResult.toObject() });
  } catch (err) {
    return res.status(500).json({ error: `An error occurred here: ${err.message}` });
  }
};

export { getOrCreateDirectConversation, createGroupConversation };
