import api from '../api/axios';

const userService = {
  async getMe() {
    const { data } = await api.get('/api/users/me');
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/api/users/${id}`);
    return data;
  },

  async update(user) {
    const { data } = await api.put('/api/users/update', user);
    return data;
  },

  async search(name) {
    const { data } = await api.get('/api/users/search', { params: { name } });
    return data;
  },

  async generateBio(userId) {
    const { data } = await api.post(`/api/users/${userId}/generate-bio`);
    return data.bio;
  },
};

export default userService;
