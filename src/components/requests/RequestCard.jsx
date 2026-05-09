import Avatar from '../common/Avatar';
import RequestActions from './RequestActions';

const statusColors = {
  PENDING: { bg: '#fffbe6', text: '#d48806' },
  ACCEPTED: { bg: '#f6ffed', text: '#52c41a' },
  REJECTED: { bg: '#fff1f0', text: '#ff4d4f' },
  COMPLETED: { bg: '#f0f5ff', text: '#6c63ff' },
};

export default function RequestCard({ request, mode, onAccept, onReject, onComplete }) {
  const other = mode === 'received' ? request.sender : request.receiver;
  const colors = statusColors[request.status] || statusColors.PENDING;

  return (
    <div style={{
      background: '#fff', borderRadius: '12px', padding: '20px',
      border: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar name={other?.userName || ''} size={40} />
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{other?.userName}</p>
            <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>{other?.userEmail}</p>
          </div>
        </div>
        <span style={{ background: colors.bg, color: colors.text, padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
          {request.status}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#555' }}>
        <span>Offers: <strong>{request.offeredSkill?.skillName}</strong></span>
        <span>Wants: <strong>{request.requestedSkill?.skillName}</strong></span>
      </div>

      {request.message && (
        <p style={{ margin: 0, background: '#fafafa', padding: '10px', borderRadius: '8px', fontSize: '13px', color: '#555' }}>
          "{request.message}"
        </p>
      )}

      <RequestActions
        request={request}
        mode={mode}
        onAccept={onAccept}
        onReject={onReject}
        onComplete={onComplete}
      />
    </div>
  );
}
