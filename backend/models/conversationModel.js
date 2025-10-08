import mongoose from 'mongoose';
const createConversationSchema = new mongoose.Schema(
  {
    conversation_type: { type: String, enum: ['direct', 'group'] },
    title: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    participants: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        role: { type: String, enum: ['member', 'admin'] },
      },
    ],
    deleted_for: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    last_message: {
      message_id: { type: mongoose.Schema.Types.ObjectId, ref: 'message' },
      content: { type: String },
      message_type: { type: String, enum: ['text', 'image', 'video', 'file'] },
      createdAt: { type: Date },
    },
    group_image: { type: String },
  },
  { timestamps: true },
);

const Conversation = mongoose.model('conversation', createConversationSchema);
export default Conversation;
