import ReviewCard from './ReviewCard';

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        <p style={{ fontSize: '32px', margin: '0 0 12px' }}>⭐</p>
        <p>No reviews yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
    </div>
  );
}
