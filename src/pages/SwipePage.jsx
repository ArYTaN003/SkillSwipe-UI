import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import swipeService from '../services/swipeService';
import SwipeStack from '../components/swipe/SwipeStack';
import Loader from '../components/common/Loader';

export default function SwipePage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedCount, setLikedCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);

  useEffect(() => {
    if (!user?.userId) return;
    swipeService.getCandidates(user.userId)
      .then(setCandidates)
      .catch(() => show('Failed to load candidates', 'error'))
      .finally(() => setLoading(false));
  }, [user]);

  function removeTop() {
    setCandidates((prev) => prev.slice(1));
  }

  async function handleLike(candidate) {
    try {
      await swipeService.action(user.userId, candidate.userId, 'LIKE');
      setLikedCount((c) => c + 1);
      show(`You liked ${candidate.userName}!`, 'success');
    } catch {
      show('Action failed', 'error');
    } finally {
      removeTop();
    }
  }

  async function handlePass(candidate) {
    try {
      await swipeService.action(user.userId, candidate.userId, 'PASS');
      setPassedCount((c) => c + 1);
    } catch {
    } finally {
      removeTop();
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 800, color: '#1a1a2e' }}>
          Discover
        </h2>
        <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
          Find people who have what you want — and want what you have.
        </p>
      </div>

      {(likedCount > 0 || passedCount > 0) && (
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px' }}>
          <span style={{ background: '#f6ffed', color: '#52c41a', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
            ✓ {likedCount} liked
          </span>
          <span style={{ background: '#fff1f0', color: '#ff4d4f', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
            ✕ {passedCount} passed
          </span>
        </div>
      )}

      {candidates.length > 0 && (
        <p style={{ textAlign: 'center', color: '#bbb', fontSize: '13px', marginBottom: '20px' }}>
          {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} remaining
        </p>
      )}

      {loading ? (
        <Loader message="Finding your matches…" />
      ) : (
        <SwipeStack
          candidates={candidates}
          onLike={handleLike}
          onPass={handlePass}
        />
      )}

      {!loading && candidates.length > 0 && (
        <p style={{ textAlign: 'center', color: '#ccc', fontSize: '12px', marginTop: '28px' }}>
          ✕ to pass &nbsp;·&nbsp; ✓ to like
        </p>
      )}
    </div>
  );
}
