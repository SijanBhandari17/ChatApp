import mongoose from 'mongoose';
import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';
import { cloudinary } from '../config/cloudinary.js';

const handleMessageSend = async (req, res) => {
  const { conversation_id, sender_id, content, message_type } = req.body;
  const files = req.files;
  console.log({ content });

  if (!conversation_id || !sender_id || !message_type) {
    return res.status(400).json({
      error: 'Missing required fields',
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  let attachments = [];

  try {
    if (files) {
      const uploadPromise = files.map(async file => {
        const file_type = file.mimetype.startsWith('/image/') ? 'image' : 'video';
        const file_size = file.size / (1024 * 1024);
        const file_name = file.name;
        const mime_type = file.mimetype;

        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'messageResource',
          resource_type: 'image',
        });

        const url = result.secure_url;
        const public_id = result.public_id;
        return {
          url,
          public_id,
          file_name,
          file_size,
          file_type,
          mime_type,
        };
      });
      attachments = await Promise.all(uploadPromise);
    }
    const messageResult = await Message.create({
      conversation_id,
      sender_id,
      content: content || '',
      message_type,
      attachments,
    });
    const messageObject = messageResult.toObject();
    console.log(messageObject);

    const lastMessage = {
      message_type: messageObject.message_type,
      content: messageObject.content,
      createdAt: messageObject.createdAt,
      message_id: messageObject._id,
      attachments,
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
