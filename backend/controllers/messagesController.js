import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';

const handleMessageSend = async (req, res) => {
  const { conversation_id, sender_id, content, message_type } = req.body;

  if (!conversation_id || !sender_id || !content || !message_type) {
    return res.status(400).json({
      error: 'Missing required fields',
    });
  }

  try {
    const messageResult = await Message.create({
      conversation_id,
      sender_id,
      content,
      message_type,
    });
    const messageObject = messageResult.toObject();

    const lastMessage = {
      message_type: messageObject.message_type,
      content: messageObject.content,
      created_at: messageObject.createdAt,
      message_id: messageObject._id,
    };

    await Conversation.findByIdAndUpdate(conversation_id, {
      $set: { last_message: lastMessage },
    });

    return res
      .status(201)
      .json({ message: 'successful message creation', body: messageResult.toObject() });
  } catch (err) {
    return res.status(500).json({ error: `An  error occurred: ${err.message}` });
  }
};

export { handleMessageSend };
