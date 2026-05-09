import api from '../api/axios';

const skillService = {
  async getAll() {
    const { data } = await api.get('/api/skills');
    return data;
  },

  async create(skill) {
    const { data } = await api.post('/api/skills', skill);
    return data;
  },

  async addToUser(usersSkills) {
    const { data } = await api.post('/api/users/skills', usersSkills);
    return data;
  },

  async removeFromUser(id) {
    await api.delete(`/api/users/skills/${id}`);
  },
};

export default skillService;
