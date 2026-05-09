import api from '../api/axios';

const requestService = {
  async create(request) {
    const { data } = await api.post('/api/requests', request);
    return data;
  },

  async getSent(userId) {
    const { data } = await api.get('/api/requests/sent', { params: { userId } });
    return data;
  },

  async getReceived(userId) {
    const { data } = await api.get('/api/requests/received', { params: { userId } });
    return data;
  },

  async accept(id) {
    const { data } = await api.put(`/api/requests/${id}/accept`);
    return data;
  },

  async reject(id) {
    const { data } = await api.put(`/api/requests/${id}/reject`);
    return data;
  },

  async complete(id) {
    const { data } = await api.put(`/api/requests/${id}/complete`);
    return data;
  },
};

export default requestService;
