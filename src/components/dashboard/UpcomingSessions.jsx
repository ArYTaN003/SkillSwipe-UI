import Avatar from '../common/Avatar';

export default function UpcomingSessions({ sessions = [] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e8e8e8' }}>
      <h4 style={{ margin: '0 0 16px', fontSize: '15px' }}>Active Sessions</h4>
      {sessions.length === 0 ? (
        <p style={{ color: '#999', fontSize: '14px' }}>No active sessions.</p>
      ) : (
        sessions.map((s) => {
          const partner = s.sender || s.receiver;
          return (
            <div key={s.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              <Avatar name={partner?.userName || ''} size={32} />
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>{partner?.userName}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>
                  {s.offeredSkill?.skillName} ↔ {s.requestedSkill?.skillName}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
