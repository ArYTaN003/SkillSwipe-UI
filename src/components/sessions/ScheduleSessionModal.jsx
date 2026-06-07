import Modal from '../common/Modal';
import Button from '../common/Button';
import InputField from '../common/InputField';
import { useState, useEffect } from 'react';
import sessionService from '../../services/sessionService';
import { useToast } from '../common/Toast';

export default function ScheduleSessionModal({ isOpen, onClose, session }) {
  const { show } = useToast();
  const [meetingLink, setMeetingLink] = useState('');
  const [proposedTime, setProposedTime] = useState('');
  const [proposal, setProposal] = useState(null);
  const [loadingProposal, setLoadingProposal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState('propose'); // 'propose' | 'counter'

  useEffect(() => {
    if (!isOpen || !session?.id) return;
    setLoadingProposal(true);
    sessionService.getProposal(session.id)
      .then(setProposal)
      .catch(() => setProposal(null))
      .finally(() => setLoadingProposal(false));
  }, [isOpen, session?.id]);

  async function handleSendProposal() {
    if (!meetingLink && !proposedTime) {
      show('Please provide a meeting link or time', 'error');
      return;
    }
    setSaving(true);
    try {
      const updated = mode === 'counter'
        ? await sessionService.counterPropose(session.id, { meetingLink, proposedTime })
        : await sessionService.propose(session.id, { meetingLink, proposedTime });
      setProposal(updated);
      setMeetingLink('');
      setProposedTime('');
      setMode('propose');
      show('Proposal sent!', 'success');
    } catch {
      show('Failed to send proposal', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleAcceptProposal() {
    setSaving(true);
    try {
      const updated = await sessionService.acceptProposal(session.id);
      setProposal(updated);
      show('Session scheduled!', 'success');
    } catch {
      show('Failed to accept proposal', 'error');
    } finally {
      setSaving(false);
    }
  }

  function startCounter() {
    setMeetingLink(proposal?.meetingLink || '');
    setProposedTime(proposal?.proposedTime ? proposal.proposedTime.slice(0, 16) : '');
    setMode('counter');
  }

  const isConfirmed = proposal?.status === 'CONFIRMED';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Session"
      footer={<Button variant="ghost" onClick={onClose}>Close</Button>}
    >
      {loadingProposal ? (
        <p style={{ color: '#aaa', textAlign: 'center', padding: '20px' }}>Loading…</p>
      ) : (
        <>
          {isConfirmed && (
            <div style={{
              background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '10px',
              padding: '16px', marginBottom: '20px',
            }}>
              <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#52c41a', fontSize: '14px' }}>
                Session Confirmed!
              </p>
              {proposal.meetingLink && (
                <p style={{ margin: '0 0 6px', fontSize: '14px' }}>
                  <strong>Link:</strong>{' '}
                  <a href={proposal.meetingLink} target="_blank" rel="noreferrer" style={{ color: '#1890ff', wordBreak: 'break-all' }}>
                    {proposal.meetingLink}
                  </a>
                </p>
              )}
              {proposal.proposedTime && (
                <p style={{ margin: 0, fontSize: '14px' }}>
                  <strong>Time:</strong> {new Date(proposal.proposedTime).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {!isConfirmed && proposal && proposal.status === 'PENDING' && (
            <div style={{
              background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '10px',
              padding: '16px', marginBottom: '20px',
            }}>
              <p style={{ margin: '0 0 10px', fontWeight: 600, color: '#faad14', fontSize: '14px' }}>
                Incoming Proposal
              </p>
              {proposal.meetingLink && (
                <p style={{ margin: '0 0 6px', fontSize: '14px' }}>
                  <strong>Link:</strong>{' '}
                  <a href={proposal.meetingLink} target="_blank" rel="noreferrer" style={{ color: '#1890ff', wordBreak: 'break-all' }}>
                    {proposal.meetingLink}
                  </a>
                </p>
              )}
              {proposal.proposedTime && (
                <p style={{ margin: '0 0 12px', fontSize: '14px' }}>
                  <strong>Proposed time:</strong> {new Date(proposal.proposedTime).toLocaleString()}
                </p>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="sm" onClick={handleAcceptProposal} disabled={saving}>Accept</Button>
                <Button size="sm" variant="secondary" onClick={startCounter} disabled={saving}>
                  Suggest Another Time
                </Button>
              </div>
            </div>
          )}

          {!isConfirmed && (
            <div>
              <p style={{ margin: '0 0 14px', fontSize: '14px', color: '#555' }}>
                {mode === 'counter' ? 'Suggest a different time or link:' : 'Send a meeting proposal:'}
              </p>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                  Meeting Link
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/… or Zoom link…"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: '8px',
                    border: '1px solid #d9d9d9', fontSize: '14px', boxSizing: 'border-box',
                  }}
                />
              </div>
              <InputField
                label="Proposed Date & Time"
                name="proposedTime"
                type="datetime-local"
                value={proposedTime}
                onChange={(e) => setProposedTime(e.target.value)}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                {mode === 'counter' && (
                  <Button variant="ghost" size="sm" onClick={() => setMode('propose')}>Cancel</Button>
                )}
                <Button onClick={handleSendProposal} disabled={saving}>
                  {saving ? 'Sending…' : mode === 'counter' ? 'Send Counter-Proposal' : 'Send Proposal'}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
