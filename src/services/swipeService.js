import api from '../api/axios';

const swipeService = {
  async getCandidates(userId) {
    const { data } = await api.get('/api/swipe/candidates', { params: { userId } });
    return data;
  },

  async action(swiperId, targetId, action) {
    const { data } = await api.post('/api/swipe/action', { swiperId, targetId, action });
    return data;
  },

  async getLikesReceived(userId) {
    const { data } = await api.get('/api/swipe/likes-received', { params: { userId } });
    return data;
  },

  async acceptLike(swiperId, targetId) {
    const { data } = await api.post('/api/swipe/match', { swiperId, targetId });
    return data;
  },

  async rejectLike(swiperId, targetId) {
    const { data } = await api.post('/api/swipe/action', { swiperId: targetId, targetId: swiperId, action: 'PASS' });
    return data;
  },
};

export default swipeService;
