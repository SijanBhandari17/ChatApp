import { mongoose } from 'mongoose';
const createConversationSchema = new mongoose.Schema(
  {
    conversation_type: { type: String, enum: ['direct', 'group'] },
    title: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['member', 'admin'] },
      },
    ],
  },
  { timestamps: true },
);

const Conversation = mongoose.model('conversation', createConversationSchema);
export default Conversation;
