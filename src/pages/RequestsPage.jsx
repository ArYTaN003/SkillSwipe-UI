import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import requestService from '../services/requestService';
import RequestList from '../components/requests/RequestList';
import Loader from '../components/common/Loader';

export default function RequestsPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [tab, setTab] = useState('received');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [s, r] = await Promise.all([
        requestService.getSent(user.userId),
        requestService.getReceived(user.userId),
      ]);
      setSent(s);
      setReceived(r);
    } catch {
      show('Failed to load requests', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (user) load(); }, [user]);

  async function handleAccept(id) {
    try {
      const updated = await requestService.accept(id);
      setReceived((prev) => prev.map((r) => r.id === id ? updated : r));
      show('Request accepted!', 'success');
    } catch { show('Failed to accept', 'error'); }
  }

  async function handleReject(id) {
    try {
      const updated = await requestService.reject(id);
      setReceived((prev) => prev.map((r) => r.id === id ? updated : r));
      show('Request rejected', 'info');
    } catch { show('Failed to reject', 'error'); }
  }

  async function handleComplete(id) {
    try {
      const updated = await requestService.complete(id);
      setSent((prev) => prev.map((r) => r.id === id ? updated : r));
      setReceived((prev) => prev.map((r) => r.id === id ? updated : r));
      show('Marked as complete!', 'success');
    } catch { show('Failed to complete', 'error'); }
  }

  const tabStyle = (active) => ({
    padding: '8px 20px', borderRadius: '8px', border: 'none',
    background: active ? '#6c63ff' : '#f5f5f5',
    color: active ? '#fff' : '#555',
    cursor: 'pointer', fontWeight: 500, fontSize: '14px',
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Exchange Requests</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button style={tabStyle(tab === 'received')} onClick={() => setTab('received')}>
          Received {received.filter(r => r.status === 'PENDING').length > 0 && `(${received.filter(r => r.status === 'PENDING').length})`}
        </button>
        <button style={tabStyle(tab === 'sent')} onClick={() => setTab('sent')}>Sent</button>
      </div>
      {loading ? <Loader /> : (
        <RequestList
          requests={tab === 'received' ? received : sent}
          mode={tab}
          onAccept={handleAccept}
          onReject={handleReject}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
