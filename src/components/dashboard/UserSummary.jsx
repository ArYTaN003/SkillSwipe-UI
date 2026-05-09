import Avatar from '../common/Avatar';
import { Link } from 'react-router-dom';

export default function UserSummary({ user, avgRating, reviewCount }) {
  if (!user) return null;

  return (
    <div style={{ background: 'linear-gradient(135deg, #6c63ff, #8b82ff)', borderRadius: '12px', padding: '24px', color: '#fff' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Avatar name={user.userName || user.userEmail} size={56} style={{ border: '2px solid rgba(255,255,255,0.4)' }} />
        <div>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>{user.userName}</p>
          <p style={{ margin: '2px 0 0', opacity: 0.8, fontSize: '13px' }}>{user.userEmail}</p>
          {avgRating && (
            <p style={{ margin: '6px 0 0', fontSize: '13px' }}>
              ⭐ {avgRating} / 5 · {reviewCount} review{reviewCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
      <Link to="/profile/edit" style={{ display: 'inline-block', marginTop: '16px', padding: '6px 14px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', textDecoration: 'none', fontSize: '13px' }}>
        Edit Profile
      </Link>
    </div>
  );
}
