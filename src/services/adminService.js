import api from '../api/axios';
import userService from './userService';

const adminService = {
  async searchUsers(name) {
    return userService.search(name || '');
  },

  async getAllReviews() {
    const { data } = await api.get('/api/reviews');
    return data;
  },
};

export default adminService;
