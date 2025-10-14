import { create } from 'zustand';
import { api } from '@/lib/axiosConfig';

const conversationStore = create(set => ({
  conversations: null,
  selectedConversation: null,
  setConversations: conversations => set({ conversations }),
  setSelectedConversation: selectedConversation => set({ selectedConversation }),

  addConversation: newConversation =>
    set(state => {
      return { conversations: [newConversation, ...state.conversations] };
    }),

  updateConversations: (id, message) =>
    set(state => {
      const index = state.conversations.findIndex(c => c._id === id);
      if (index === -1) return state;

      const updatedConv = {
        ...state.conversations[index],
        last_message: message,
      };

      const newConversations = [
        updatedConv,
        ...state.conversations.slice(0, index),
        ...state.conversations.slice(index + 1),
      ];

      return { conversations: newConversations };
    }),

  getConversations: async () => {
    return await api.get('/dashboard/conversations');
  },

  getSelectedConversationMessages: async ({ c_id, page, limit }) => {
    return await api.get(`/messages?c_id=${c_id}&page=${page}&limit=${limit}`);
  },

  sendDirectMessage: async messageData => {
    return await api.post('/messages/send/direct', messageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  resetConversation: () => {
    set({
      conversations: null,
      selectedConversation: null,
    });
  },
}));

const useConversation = () => {
  const {
    conversations,
    getConversations,
    getSelectedConversationMessages,
    selectedConversation,
    setConversations,
    sendDirectMessage,
    setSelectedConversation,
    resetConversation,
    updateConversations,
    addConversation,
  } = conversationStore();
  return {
    conversations,
    selectedConversation,
    getSelectedConversationMessages,
    getConversations,
    sendDirectMessage,
    setConversations,
    setSelectedConversation,
    resetConversation,
    updateConversations,
    addConversation,
  };
};

export default useConversation;
