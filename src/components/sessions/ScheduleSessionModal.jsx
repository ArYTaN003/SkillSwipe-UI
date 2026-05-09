import Modal from '../common/Modal';
import Button from '../common/Button';
import InputField from '../common/InputField';
import { useState } from 'react';

export default function ScheduleSessionModal({ isOpen, onClose, session }) {
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Session"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onClose(); }}>Save</Button>
        </>
      }
    >
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
        Note: scheduling is managed outside the platform. Use this to record your agreed time.
      </p>
      <InputField label="Agreed Date & Time" name="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
          placeholder="Meeting link, location, topics…"
        />
      </div>
    </Modal>
  );
}
