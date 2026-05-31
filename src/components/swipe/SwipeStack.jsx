import { useState, useEffect } from 'react';
import SwipeCard from './SwipeCard';

const swipeStyles = `
@keyframes swipeRight {
  0%   { transform: translateX(0) rotate(0deg); opacity: 1; }
  100% { transform: translateX(120%) rotate(20deg); opacity: 0; }
}
@keyframes swipeLeft {
  0%   { transform: translateX(0) rotate(0deg); opacity: 1; }
  100% { transform: translateX(-120%) rotate(-20deg); opacity: 0; }
}
.swipe-right { animation: swipeRight 0.4s ease forwards; }
.swipe-left  { animation: swipeLeft  0.4s ease forwards; }
`;

export default function SwipeStack({ candidates, onLike, onPass }) {
  const [swipeDir, setSwipeDir] = useState(null); // 'right' | 'left' | null

  // Reset animation class when the top card changes
  useEffect(() => {
    setSwipeDir(null);
  }, [candidates[0]?.userId]);

  const handleLike = (candidate) => {
    setSwipeDir('right');
    setTimeout(() => onLike(candidate), 380);
  };

  const handlePass = (candidate) => {
    setSwipeDir('left');
    setTimeout(() => onPass(candidate), 380);
  };

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

  const top = candidates[0];
  const next = candidates[1];

  const animClass = swipeDir === 'right' ? 'swipe-right' : swipeDir === 'left' ? 'swipe-left' : '';

  return (
    <>
      <style>{swipeStyles}</style>
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
        <div className={animClass} style={{ position: 'relative', zIndex: 1 }}>
          <SwipeCard
            key={top.userId}
            candidate={top}
            onLike={() => handleLike(top)}
            onPass={() => handlePass(top)}
          />
        </div>
      </div>
    </>
  );
}
