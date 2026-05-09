import Avatar from '../common/Avatar';

export default function RecentRequests({ requests = [] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e8e8e8' }}>
      <h4 style={{ margin: '0 0 16px', fontSize: '15px' }}>Pending Requests</h4>
      {requests.length === 0 ? (
        <p style={{ color: '#999', fontSize: '14px' }}>No pending requests.</p>
      ) : (
        requests.map((r) => (
          <div key={r.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <Avatar name={r.sender?.userName || ''} size={32} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>{r.sender?.userName}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>
                {r.offeredSkill?.skillName} ↔ {r.requestedSkill?.skillName}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
