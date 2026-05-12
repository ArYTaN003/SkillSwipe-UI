import { useState } from 'react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import ScheduleSessionModal from './ScheduleSessionModal';

export default function SessionCard({ session, onComplete, currentUserId }) {
  const isSender = String(session.sender?.userId) === String(currentUserId);
  const partner = isSender ? session.receiver : session.sender;
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '20px',
        border: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <Avatar name={partner?.userName || ''} size={44} />
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{partner?.userName}</p>
            <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>
              Exchanging: <strong>{session.offeredSkill?.skillName}</strong> ↔ <strong>{session.requestedSkill?.skillName}</strong>
            </p>
            <p style={{ margin: '4px 0 0', color: '#aaa', fontSize: '12px' }}>
              Accepted on {new Date(session.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ background: '#f6ffed', color: '#52c41a', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
            ACTIVE
          </span>
          <Button size="sm" variant="secondary" onClick={() => setShowSchedule(true)}>Schedule</Button>
          {onComplete && (
            <Button size="sm" variant="secondary" onClick={() => onComplete(session.id)}>Complete</Button>
          )}
        </div>
      </div>
      <ScheduleSessionModal
        isOpen={showSchedule}
        onClose={() => setShowSchedule(false)}
        session={session}
      />
    </>
  );
}
