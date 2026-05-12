import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import requestService from '../services/requestService';
import swipeService from '../services/swipeService';
import RequestList from '../components/requests/RequestList';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

function LikedMeList({ likes, onAccept, onReject }) {
  if (likes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        <p style={{ fontSize: '32px', margin: '0 0 12px' }}>💤</p>
        <p>No one has liked your profile yet. Go discover people!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {likes.map((liker) => (
        <div key={liker.userId} style={{
          background: '#fff', borderRadius: '12px', padding: '16px 20px',
          border: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <Avatar name={liker.userName || liker.userEmail} size={44} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '15px' }}>{liker.userName}</p>
              <p style={{ margin: '2px 0 0', color: '#888', fontSize: '13px' }}>{liker.userEmail}</p>
              {liker.userBio && (
                <p style={{ margin: '4px 0 0', color: '#aaa', fontSize: '12px' }}>
                  {liker.userBio.length > 80 ? liker.userBio.slice(0, 80) + '…' : liker.userBio}
                </p>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <Button size="sm" variant="secondary" onClick={() => onReject(liker)}>Reject</Button>
            <Button size="sm" onClick={() => onAccept(liker)}>Accept</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RequestsPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [likes, setLikes] = useState([]);
  const [tab, setTab] = useState('received');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [s, r, l] = await Promise.all([
        requestService.getSent(user.userId),
        requestService.getReceived(user.userId),
        swipeService.getLikesReceived(user.userId).catch(() => []),
      ]);
      setSent(s);
      setReceived(r);
      setLikes(l);
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

  async function handleLikeAccept(liker) {
    try {
      await swipeService.acceptLike(liker.userId, user.userId);
      setLikes((prev) => prev.filter((l) => l.userId !== liker.userId));
      show(`Matched with ${liker.userName}! Check Sessions.`, 'success');
    } catch { show('Failed to accept like', 'error'); }
  }

  async function handleLikeReject(liker) {
    try {
      await swipeService.rejectLike(liker.userId, user.userId);
      setLikes((prev) => prev.filter((l) => l.userId !== liker.userId));
      show('Rejected', 'info');
    } catch { show('Failed to reject like', 'error'); }
  }

  const tabStyle = (active) => ({
    padding: '8px 20px', borderRadius: '8px', border: 'none',
    background: active ? '#6c63ff' : '#f5f5f5',
    color: active ? '#fff' : '#555',
    cursor: 'pointer', fontWeight: 500, fontSize: '14px',
  });

  const pendingReceived = received.filter(r => r.status === 'PENDING').length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Exchange Requests</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button style={tabStyle(tab === 'received')} onClick={() => setTab('received')}>
          Received {pendingReceived > 0 && `(${pendingReceived})`}
        </button>
        <button style={tabStyle(tab === 'sent')} onClick={() => setTab('sent')}>Sent</button>
        <button style={tabStyle(tab === 'liked')} onClick={() => setTab('liked')}>
          Liked Me {likes.length > 0 && (
            <span style={{
              display: 'inline-block', marginLeft: '6px',
              background: tab === 'liked' ? 'rgba(255,255,255,0.3)' : '#6c63ff',
              color: '#fff', borderRadius: '10px', fontSize: '11px',
              padding: '0 6px', lineHeight: '16px',
            }}>{likes.length}</span>
          )}
        </button>
      </div>

      {loading ? <Loader /> : (
        <>
          {tab === 'received' && (
            <RequestList
              requests={received}
              mode="received"
              onAccept={handleAccept}
              onReject={handleReject}
              onComplete={handleComplete}
            />
          )}
          {tab === 'sent' && (
            <RequestList
              requests={sent}
              mode="sent"
              onAccept={handleAccept}
              onReject={handleReject}
              onComplete={handleComplete}
            />
          )}
          {tab === 'liked' && (
            <LikedMeList
              likes={likes}
              onAccept={handleLikeAccept}
              onReject={handleLikeReject}
            />
          )}
        </>
      )}
    </div>
  );
}
