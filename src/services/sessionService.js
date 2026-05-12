import requestService from './requestService';
import api from '../api/axios';

// Sessions are derived from ACCEPTED exchange requests.
const sessionService = {
  async getSessions(userId) {
    const [sent, received] = await Promise.all([
      requestService.getSent(userId),
      requestService.getReceived(userId),
    ]);
    return [...sent, ...received].filter((r) => r.status === 'ACCEPTED');
  },

  async complete(requestId) {
    return requestService.complete(requestId);
  },

  async getProposal(sessionId) {
    const { data } = await api.get('/api/sessions/proposal', { params: { sessionId } });
    return data;
  },

  async propose(sessionId, { meetingLink, proposedTime }) {
    const { data } = await api.post('/api/sessions/propose', { sessionId, meetingLink, proposedTime });
    return data;
  },

  async acceptProposal(sessionId) {
    const { data } = await api.put('/api/sessions/proposal/accept', { sessionId });
    return data;
  },

  async counterPropose(sessionId, { meetingLink, proposedTime }) {
    const { data } = await api.put('/api/sessions/proposal/counter', { sessionId, meetingLink, proposedTime });
    return data;
  },
};

export default sessionService;
