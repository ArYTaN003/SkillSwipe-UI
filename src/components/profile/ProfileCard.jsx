import Avatar from '../common/Avatar';

export default function ProfileCard({ user, skillsTeach = [], skillsLearn = [], avgRating = null, reviewCount = 0 }) {
  if (!user) return null;

  return (
    <div style={{
      background: '#fff', borderRadius: '12px', padding: '28px',
      border: '1px solid #e8e8e8', display: 'flex', gap: '24px', alignItems: 'flex-start',
    }}>
      <Avatar name={user.userName || user.userEmail} size={72} />
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '22px' }}>{user.userName}</h2>
        <p style={{ margin: '0 0 8px', color: '#888', fontSize: '14px' }}>{user.userEmail}</p>
        {user.userBio && <p style={{ margin: '0 0 12px', color: '#555', fontSize: '14px', lineHeight: 1.5 }}>{user.userBio}</p>}
        {avgRating && (
          <p style={{ margin: '0 0 12px', fontSize: '14px' }}>
            ⭐ <strong>{avgRating}</strong> / 5 &nbsp;·&nbsp; {reviewCount} review{reviewCount !== 1 ? 's' : ''}
          </p>
        )}
        {skillsTeach.length > 0 && (
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Teaches</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
              {skillsTeach.map((s) => (
                <span key={s.id} style={{ background: '#e6f7ff', color: '#1890ff', padding: '3px 10px', borderRadius: '20px', fontSize: '13px' }}>
                  {s.skill.skillName}
                </span>
              ))}
            </div>
          </div>
        )}
        {skillsLearn.length > 0 && (
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Wants to Learn</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
              {skillsLearn.map((s) => (
                <span key={s.id} style={{ background: '#f0eeff', color: '#6c63ff', padding: '3px 10px', borderRadius: '20px', fontSize: '13px' }}>
                  {s.skill.skillName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
