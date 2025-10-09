import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'conversation', required: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    message_type: { type: String, enum: ['text', 'mixed', 'image', 'video', 'file'] },
    attachments: [
      {
        url: { type: String, required: true },
        public_id: { type: String },
        file_type: { type: String, enum: ['image', 'video', 'file'] },
        file_name: { type: String },
        file_size: { type: Number },
        mime_type: { type: String },
      },
    ],
  },
  { timestamps: true },
);

const Message = mongoose.model('message', messageSchema);

export default Message;
