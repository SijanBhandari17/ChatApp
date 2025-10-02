import Conversation from '../models/conversationModel.js';

const handleConversationCreation = async (req, res) => {
  const { type, participants } = req.body;

  if (!type) {
    return res.status(400).json({ error: 'Missing field: type' });
  }

  if (!participants) {
    return res.status(400).json({ error: 'Missing field: participants' });
  }
  try {
    const existingConversation = await Conversation.findOne({
      conversation_type: type,
      participants: {
        $all: [
          { $elemMatch: { user_id: participants[0] } },
          { $elemMatch: { user_id: participants[1] } },
        ],
      },
    });

    if (alreadyExisting)
      return res
        .status(200)
        .json({ message: 'conversation already exists', body: existingConversation });

    const newConversation = await Conversation.create({
      convesation_type: type,
      participants: [{ user_id: participants[0] }, { user_id: participants[1] }],
    });

    return res.status(201).json({ message: 'Coversation created', body: newConversation });
  } catch (err) {
    return res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
};

export default handleConversationCreation;
