import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { useToast } from '../common/Toast';
import skillService from '../../services/skillService';

export default function AddSkillForm({ allSkills, userId, onAdded }) {
  const [newSkillName, setNewSkillName] = useState('');
  const [creatingNew, setCreatingNew] = useState(false);
  const { show } = useToast();

  async function handleCreate(e) {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    setCreatingNew(true);
    try {
      const created = await skillService.create({ skillName: newSkillName.trim() });
      show(`Skill "${created.skillName}" created!`, 'success');
      setNewSkillName('');
      onAdded(created);
    } catch (err) {
      show(err.response?.data || 'Failed to create skill', 'error');
    } finally {
      setCreatingNew(false);
    }
  }

  return (
    <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
      <InputField
        label="Add new skill to catalogue"
        name="newSkillName"
        value={newSkillName}
        onChange={(e) => setNewSkillName(e.target.value)}
        placeholder="e.g. Python, Guitar, Design…"
        style={{ flex: 1, marginBottom: 0 }}
      />
      <Button type="submit" disabled={creatingNew} style={{ marginBottom: '16px' }}>
        {creatingNew ? 'Adding…' : '+ Add'}
      </Button>
    </form>
  );
}
