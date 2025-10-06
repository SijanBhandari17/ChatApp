import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';

const handleMessageSend = async (req, res) => {
  const { conversation_id, sender_id, content, message_type } = req.body;

  if (!conversation_id || !sender_id || !content || !message_type) {
    return res.status(400).json({
      error: 'Missing required fields',
    });
  }
  const session = await mongoose.startSession();
  session.startTransaction();

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
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ message: 'successful message creation', body: messageObject });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: `An  error occurred: ${err.message}` });
  }
};

const handleMessageGet = async (req, res) => {
  const { c_id, page = 1, limit } = req.query;
  if (!c_id)
    return res.status(400).json({
      error: 'Missing required fields',
    });

  try {
    const skip = (Number(page) - 1) * Number(limit);

    const [messageResult, totalCount] = await Promise.all([
      Message.find({ conversation_id: c_id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Message.countDocuments({ conversation_id: c_id }),
    ]);
    const totalPages = Math.ceil(totalCount / Number(limit));

    const messages = messageResult.reverse().map(msg => msg.toObject());

    return res.status(200).json({
      message: 'successful message retrival',
      body: messages,
      pagination: {
        currentPage: Number(page),
        totalPages,
        hasNextPage: Number(page) < totalPages,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: `An  error occurred: ${err.message}` });
  }
};

export { handleMessageSend, handleMessageGet };
