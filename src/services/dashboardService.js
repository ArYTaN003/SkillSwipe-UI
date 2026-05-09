import requestService from './requestService';
import reviewService from './reviewService';
import messageService from './messageService';

const dashboardService = {
  async getSummary(userId) {
    const [sent, received, reviews, unread] = await Promise.all([
      requestService.getSent(userId),
      requestService.getReceived(userId),
      reviewService.getForUser(userId),
      messageService.getUnread(userId),
    ]);

    const sessions = [...sent, ...received].filter((r) => r.status === 'ACCEPTED');
    const pending = received.filter((r) => r.status === 'PENDING');
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    return {
      totalSent: sent.length,
      totalReceived: received.length,
      activeSessions: sessions.length,
      pendingRequests: pending.length,
      reviewCount: reviews.length,
      avgRating,
      unreadMessages: unread.length,
      recentRequests: [...pending].slice(0, 5),
      upcomingSessions: sessions.slice(0, 3),
    };
  },
};

export default dashboardService;
