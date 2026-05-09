import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import Modal from '../common/Modal';
import Button from '../common/Button';
import skillService from '../../services/skillService';
import requestService from '../../services/requestService';
import InputField from '../common/InputField';

export default function SendRequestModal({ isOpen, onClose, receiver }) {
  const { user } = useAuth();
  const { show } = useToast();
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ offeredSkillId: '', requestedSkillId: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) skillService.getAll().then(setSkills);
  }, [isOpen]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.offeredSkillId || !form.requestedSkillId) {
      show('Please select both skills', 'error');
      return;
    }
    setLoading(true);
    try {
      await requestService.create({
        sender: { userId: user.userId },
        receiver: { userId: receiver.userId },
        offeredSkill: { skillId: parseInt(form.offeredSkillId) },
        requestedSkill: { skillId: parseInt(form.requestedSkillId) },
        message: form.message,
      });
      show('Request sent!', 'success');
      onClose();
    } catch (err) {
      show(err.response?.data || 'Failed to send request', 'error');
    } finally {
      setLoading(false);
    }
  }

  const selectStyle = { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px', marginBottom: '16px' };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Send Request to ${receiver?.userName}`}
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" form="sendReqForm" disabled={loading}>{loading ? 'Sending…' : 'Send Request'}</Button></>}
    >
      <form id="sendReqForm" onSubmit={handleSubmit}>
        <label style={{ fontSize: '14px', fontWeight: 500 }}>Skill you offer</label>
        <select name="offeredSkillId" value={form.offeredSkillId} onChange={handleChange} style={selectStyle}>
          <option value="">Select a skill…</option>
          {skills.map((s) => <option key={s.skillId} value={s.skillId}>{s.skillName}</option>)}
        </select>
        <label style={{ fontSize: '14px', fontWeight: 500 }}>Skill you want to learn</label>
        <select name="requestedSkillId" value={form.requestedSkillId} onChange={handleChange} style={selectStyle}>
          <option value="">Select a skill…</option>
          {skills.map((s) => <option key={s.skillId} value={s.skillId}>{s.skillName}</option>)}
        </select>
        <InputField label="Message (optional)" name="message" value={form.message} onChange={handleChange} placeholder="Introduce yourself…" />
      </form>
    </Modal>
  );
}
