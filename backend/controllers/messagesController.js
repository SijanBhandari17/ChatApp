import Message from '../models/messageModel.js';

const handleMessageSend = async (req, res) => {
  const conversation_id = req.conversation_id || req.body.conversation_id;
  const { sender_id, content, message_type } = req.body;
  if (!conversation_id) return res.status(400).json({ error: 'missin coversatoon_id' });

  if (!conversation_id || !sender_id || !content || !message_type) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['conversation_id', 'sender_id', 'content', 'message_type'],
    });
  }

  try {
    const messageResult = await Message.create({
      conversation_id,
      sender_id,
      content,
      message_type,
    });
    return res
      .status(201)
      .json({ message: 'successful message creation', body: messageResult.toObject() });
  } catch (err) {
    return res.status(500).json({ error: `An  error occurred: ${err.message}` });
  }
};

export { handleMessageSend };
