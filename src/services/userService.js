import api from '../api/axios';

const userService = {
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
};

export default userService;
