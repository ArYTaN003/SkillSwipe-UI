import Avatar from '../common/Avatar';

const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default function ReviewCard({ review }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '12px', padding: '18px',
      border: '1px solid #e8e8e8',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Avatar name={review.reviewer?.userName || ''} size={36} />
          <strong style={{ fontSize: '15px' }}>{review.reviewer?.userName}</strong>
        </div>
        <span style={{ color: '#faad14', fontSize: '16px', letterSpacing: '2px' }}>{stars(review.rating)}</span>
      </div>
      {review.comment && <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: 1.6 }}>{review.comment}</p>}
      <p style={{ margin: '8px 0 0', color: '#bbb', fontSize: '12px' }}>
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
