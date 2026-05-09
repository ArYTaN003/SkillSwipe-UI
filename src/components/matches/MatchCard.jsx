import { useState } from 'react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import SendRequestModal from '../requests/SendRequestModal';

export default function MatchCard({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '20px',
        border: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', gap: '12px',
      }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <Avatar name={user.userName || user.userEmail} size={48} />
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>{user.userName}</p>
            <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>{user.userEmail}</p>
          </div>
        </div>
        {user.userBio && (
          <p style={{ margin: 0, color: '#555', fontSize: '13px', lineHeight: 1.5 }}>
            {user.userBio.length > 100 ? user.userBio.slice(0, 100) + '…' : user.userBio}
          </p>
        )}
        <Button onClick={() => setShowModal(true)} size="sm">Send Request</Button>
      </div>
      <SendRequestModal isOpen={showModal} onClose={() => setShowModal(false)} receiver={user} />
    </>
  );
}
