import api from '../api/axios';

const reviewService = {
  async create(review) {
    const { data } = await api.post('/api/reviews', review);
    return data;
  },

  async getForUser(userId) {
    const { data } = await api.get(`/api/reviews/user/${userId}`);
    return data;
  },
};

export default reviewService;
