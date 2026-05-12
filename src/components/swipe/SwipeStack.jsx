import SwipeCard from './SwipeCard';

export default function SwipeStack({ candidates, onLike, onPass }) {
  if (candidates.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: '56px', margin: '0 0 16px' }}>🎉</p>
        <h3 style={{ margin: '0 0 8px', color: '#1a1a2e' }}>You're all caught up!</h3>
        <p style={{ color: '#aaa', fontSize: '14px' }}>
          No more candidates right now. Check back later or update your skills to find new matches.
        </p>
      </div>
    );
  }

  // Show only the top card; the one behind for depth effect
  const top = candidates[0];
  const next = candidates[1];

  return (
    <div style={{ position: 'relative', width: '340px', margin: '0 auto' }}>
      {/* Shadow card behind */}
      {next && (
        <div style={{
          position: 'absolute', top: '12px', left: '8px', right: '8px',
          background: '#e8e4ff', borderRadius: '20px', height: '100px',
          zIndex: 0, opacity: 0.5,
        }} />
      )}
      {/* Top card */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SwipeCard
          key={top.userId}
          candidate={top}
          onLike={() => onLike(top)}
          onPass={() => onPass(top)}
        />
      </div>
    </div>
  );
}
