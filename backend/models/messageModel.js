import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    message_type: { type: String, enum: ['text', 'image', 'video', 'file'] },
  },
  { timeStamps: true },
);

const Message = mongoose.model('message', messageSchema);

export default Message;
