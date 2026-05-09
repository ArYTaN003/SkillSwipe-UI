import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import dashboardService from '../services/dashboardService';
import StatsCard from '../components/dashboard/StatsCard';
import RecentRequests from '../components/dashboard/RecentRequests';
import UpcomingSessions from '../components/dashboard/UpcomingSessions';
import UserSummary from '../components/dashboard/UserSummary';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import Loader from '../components/common/Loader';

export default function DashboardPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;
    dashboardService.getSummary(user.userId)
      .then(setSummary)
      .catch(() => show('Failed to load dashboard', 'error'))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Loader message="Loading dashboard…" />;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <UserSummary user={user} avgRating={summary?.avgRating} reviewCount={summary?.reviewCount} />
        <div style={{ display: 'grid', gap: '12px' }}>
          <StatsCard label="Pending Requests" value={summary?.pendingRequests} icon="🤝" color="#faad14" />
          <StatsCard label="Unread Messages" value={summary?.unreadMessages} icon="💬" color="#1890ff" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <StatsCard label="Requests Sent" value={summary?.totalSent} icon="📤" color="#6c63ff" />
        <StatsCard label="Requests Received" value={summary?.totalReceived} icon="📥" color="#52c41a" />
        <StatsCard label="Active Sessions" value={summary?.activeSessions} icon="📅" color="#ff6b6b" />
        <StatsCard label="Reviews" value={summary?.reviewCount} icon="⭐" color="#faad14" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <RecentRequests requests={summary?.recentRequests || []} />
        <UpcomingSessions sessions={summary?.upcomingSessions || []} />
        <ActivityFeed
          requests={summary?.recentRequests || []}
          sessions={summary?.upcomingSessions || []}
        />
      </div>
    </div>
  );
}
