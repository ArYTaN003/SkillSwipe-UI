import Button from '../common/Button';

export default function RequestActions({ request, mode, onAccept, onReject, onComplete }) {
  if (request.status !== 'PENDING' && request.status !== 'ACCEPTED') return null;

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
      {mode === 'received' && request.status === 'PENDING' && (
        <>
          <Button size="sm" onClick={() => onAccept(request.id)}>Accept</Button>
          <Button size="sm" variant="danger" onClick={() => onReject(request.id)}>Reject</Button>
        </>
      )}
      {request.status === 'ACCEPTED' && (
        <Button size="sm" variant="secondary" onClick={() => onComplete(request.id)}>Mark Complete</Button>
      )}
    </div>
  );
}
