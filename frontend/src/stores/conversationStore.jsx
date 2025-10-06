import { create } from 'zustand';
import { api } from '@/lib/axiosConfig';

const conversationStore = create(set => ({
  conversations: null,
  selectedConversation: null,
  setConversations: conversations => set({ conversations }),
  setSelectedConversation: selectedConversation => set({ selectedConversation }),

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
  };
};

export default useConversation;
