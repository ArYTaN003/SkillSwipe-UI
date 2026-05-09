import api from '../api/axios';

const messageService = {
  async send(message) {
    const { data } = await api.post('/api/messages', message);
    return data;
  },

  async getConversation(userId1, userId2) {
    const { data } = await api.get('/api/messages/conversation', {
      params: { userId1, userId2 },
    });
    return data;
  },

  async getUnread(userId) {
    const { data } = await api.get('/api/messages/unread', { params: { userId } });
    return data;
  },
};

export default messageService;
