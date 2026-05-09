import SessionCard from './SessionCard';

export default function SessionList({ sessions = [], onComplete }) {
  if (sessions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        <p style={{ fontSize: '32px', margin: '0 0 12px' }}>📅</p>
        <p>No active sessions. Accept a request to start one!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sessions.map((s) => (
        <SessionCard key={s.id} session={s} onComplete={onComplete} />
      ))}
    </div>
  );
}
