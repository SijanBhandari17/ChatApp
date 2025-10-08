import { create } from 'zustand';
import { api } from '@/lib/axiosConfig';

const conversationStore = create((set, store) => ({
  conversations: null,
  selectedConversation: null,
  setConversations: conversations => set({ conversations }),
  setSelectedConversation: selectedConversation => set({ selectedConversation }),

  updateConversations: (id, message) =>
    set(state => ({
      conversations: state.conversations.map(conversation =>
        conversation._id === id ? { ...conversation, last_message: message } : conversation,
      ),
    })),

  getConversations: async () => {
    return await api.get('/dashboard/conversations');
  },

  getSelectedConversationMessages: async ({ c_id, page, limit }) => {
    return await api.get(`/messages?c_id=${c_id}&page=${page}&limit=${limit}`);
  },

  sendDirectMessage: async messageData => {
    return await api.post('/messages/send/direct', messageData);
  },
  resetConversation: () => {
    set(store.getInitiailState());
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
  };
};

export default useConversation;
