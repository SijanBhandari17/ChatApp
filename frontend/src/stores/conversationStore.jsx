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
}));

const useConversation = () => {
  const {
    conversations,
    getConversations,
    getSelectedConversationMessages,
    selectedConversation,
    setConversations,
    setSelectedConversation,
  } = conversationStore();
  return {
    conversations,
    selectedConversation,
    getSelectedConversationMessages,
    getConversations,
    setConversations,
    setSelectedConversation,
  };
};

export default useConversation;
