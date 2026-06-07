import Avatar from '../common/Avatar';

export default function SwipeCard({ candidate, onLike, onPass }) {
  const teachSkills = candidate.skills?.filter((s) => s.type === 'TEACH') || [];
  const learnSkills = candidate.skills?.filter((s) => s.type === 'LEARN') || [];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      boxShadow: '0 8px 40px rgba(108,99,255,0.14)',
      padding: '32px 28px',
      width: '340px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Avatar name={candidate.userName || candidate.userEmail} size={80} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '20px', color: '#1a1a2e' }}>
            {candidate.userName}
          </p>
          <p style={{ margin: '2px 0 0', color: '#aaa', fontSize: '13px' }}>{candidate.userEmail}</p>
        </div>
      </div>

      {candidate.userBio && (
        <p style={{
          margin: 0, fontSize: '14px', color: '#555', lineHeight: 1.6,
          textAlign: 'center', borderTop: '1px solid #f5f5f5', paddingTop: '16px',
        }}>
          {candidate.userBio.length > 120 ? candidate.userBio.slice(0, 120) + '…' : candidate.userBio}
        </p>
      )}

      {teachSkills.length > 0 && (
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: '#52c41a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Can teach you
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {teachSkills.map((s) => (
              <span key={s.id || s.skill?.skillId} style={{
                padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 500,
                background: '#f6ffed', color: '#52c41a', border: '1px solid #b7eb8f',
              }}>
                {s.skill?.skillName || s.skillName}
              </span>
            ))}
          </div>
        </div>
      )}

      {learnSkills.length > 0 && (
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: '#6c63ff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Wants to learn
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {learnSkills.map((s) => (
              <span key={s.id || s.skill?.skillId} style={{
                padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 500,
                background: '#f0eeff', color: '#6c63ff', border: '1px solid #c8c3f5',
              }}>
                {s.skill?.skillName || s.skillName}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
        <button
          onClick={onPass}
          title="Pass"
          style={{
            width: '60px', height: '60px', borderRadius: '50%',
            border: '2px solid #ff4d4f', background: '#fff',
            color: '#ff4d4f', fontSize: '24px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(255,77,79,0.2)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#ff4d4f'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ff4d4f'; }}
        >
          ✕
        </button>
        <button
          onClick={onLike}
          title="Like"
          style={{
            width: '60px', height: '60px', borderRadius: '50%',
            border: '2px solid #52c41a', background: '#fff',
            color: '#52c41a', fontSize: '24px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(82,196,26,0.2)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#52c41a'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#52c41a'; }}
        >
          ✓
        </button>
      </div>
    </div>
  );
}
