import Avatar from '../common/Avatar';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ActivityFeed({ requests = [], sessions = [] }) {
  const events = [
    ...requests.map((r) => ({ type: 'request', data: r, date: r.createdAt })),
    ...sessions.map((s) => ({ type: 'session', data: s, date: s.createdAt })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e8e8e8' }}>
      <h4 style={{ margin: '0 0 16px', fontSize: '15px' }}>Recent Activity</h4>
      {events.length === 0 ? (
        <p style={{ color: '#999', fontSize: '14px' }}>No activity yet.</p>
      ) : (
        events.map((e, i) => {
          const r = e.data;
          const person = e.type === 'request' ? r.sender : (r.sender || r.receiver);
          return (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
              <Avatar name={person?.userName || ''} size={30} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#333' }}>
                  {e.type === 'request' ? (
                    <><strong>{r.sender?.userName}</strong> sent a request · {r.offeredSkill?.skillName} ↔ {r.requestedSkill?.skillName}</>
                  ) : (
                    <><strong>{person?.userName}</strong> — session active</>
                  )}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#bbb' }}>{timeAgo(e.date)}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
