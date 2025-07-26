import api from '@/lib/api';
import { ChatType, MessageType } from '@/types/chatType';

export const ChatServices = {
  createChat: async (chatData: ChatType): Promise<ChatType> => {
    try {
      const response = await api.post('/new', chatData);
      return response.data;
    } catch (error) {
      console.error('Помилка створення чату:', error);
      throw error;
    }
  },
  getAllChats: async (): Promise<ChatType[]> => {
    try {
      const response = await api.get('/rooms');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteChat: async (roomId: string): Promise<void> => {
    try {
      const response = await api.delete(`/room/${roomId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  sendMessage: async (
    roomId: string,
    messageContent: string,
    userId: number
  ): Promise<MessageType> => {
    try {
      const response = await api.post(`/room/${roomId}/message`, {
        content: messageContent,
        userId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
