import RequestCard from './RequestCard';

export default function RequestList({ requests = [], mode, onAccept, onReject, onComplete }) {
  if (requests.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        <p style={{ fontSize: '32px', margin: '0 0 12px' }}>📭</p>
        <p>No requests here yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {requests.map((r) => (
        <RequestCard key={r.id} request={r} mode={mode} onAccept={onAccept} onReject={onReject} onComplete={onComplete} />
      ))}
    </div>
  );
}
