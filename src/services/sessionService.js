import requestService from './requestService';

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
};

export default sessionService;
