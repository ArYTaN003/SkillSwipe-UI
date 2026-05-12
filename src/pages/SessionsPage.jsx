import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import sessionService from '../services/sessionService';
import requestService from '../services/requestService';
import SessionList from '../components/sessions/SessionList';
import CalendarView from '../components/sessions/CalendarView';
import Loader from '../components/common/Loader';

export default function SessionsPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await sessionService.getSessions(user.userId);
      setSessions(data);
    } catch {
      show('Failed to load sessions', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (user) load(); }, [user]);

  async function handleComplete(id) {
    try {
      await requestService.complete(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      show('Session completed!', 'success');
    } catch {
      show('Failed to complete session', 'error');
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '8px' }}>Active Sessions</h2>
      <p style={{ color: '#888', marginBottom: '24px' }}>Sessions are accepted exchange requests in progress.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
        <div>
          {loading ? <Loader /> : <SessionList sessions={sessions} onComplete={handleComplete} currentUserId={user.userId} />}
        </div>
        <CalendarView sessions={sessions} />
      </div>
    </div>
  );
}
