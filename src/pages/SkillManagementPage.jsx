import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import skillService from '../services/skillService';
import AddSkillForm from '../components/skills/AddSkillForm';
import SkillSelector from '../components/skills/SkillSelector';
import UserSkillList from '../components/skills/UserSkillList';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

export default function SkillManagementPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [allSkills, setAllSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ skillId: '', type: 'TEACH', level: 'BEGINNER' });

  async function loadData() {
    setLoading(true);
    try {
      const skills = await skillService.getAll();
      setAllSkills(skills);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  function handleSelectorChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleAddUserSkill(e) {
    e.preventDefault();
    if (!form.skillId) { show('Please select a skill', 'error'); return; }
    setAdding(true);
    try {
      const payload = {
        user: { userId: user.userId },
        skill: { skillId: form.skillId },
        type: form.type,
        experienceLevel: form.level,
      };
      const created = await skillService.addToUser(payload);
      setUserSkills((prev) => [...prev, created]);
      show('Skill added!', 'success');
    } catch (err) {
      show(err.response?.data || 'Failed to add skill', 'error');
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id) {
    try {
      await skillService.removeFromUser(id);
      setUserSkills((prev) => prev.filter((s) => s.id !== id));
      show('Skill removed', 'info');
    } catch {
      show('Failed to remove skill', 'error');
    }
  }

  function handleCatalogueAdd(newSkill) {
    setAllSkills((prev) => [...prev, newSkill]);
  }

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '8px' }}>Skill Management</h2>
      <p style={{ color: '#888', marginBottom: '28px' }}>Add the skills you can teach and the ones you want to learn.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #e8e8e8' }}>
          <h3 style={{ marginBottom: '16px' }}>Add a Skill to Your Profile</h3>
          <form onSubmit={handleAddUserSkill}>
            <SkillSelector
              skills={allSkills}
              selectedId={form.skillId}
              type={form.type}
              level={form.level}
              onChange={handleSelectorChange}
            />
            <Button type="submit" disabled={adding}>{adding ? 'Adding…' : 'Add to My Profile'}</Button>
          </form>
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #e8e8e8' }}>
          <h3 style={{ marginBottom: '16px' }}>Create New Skill</h3>
          <AddSkillForm allSkills={allSkills} userId={user.userId} onAdded={handleCatalogueAdd} />
          <p style={{ fontSize: '13px', color: '#999', marginTop: '12px' }}>
            Can't find your skill in the list? Add it to the catalogue first, then add it to your profile.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>My Skills</h3>
        <UserSkillList skills={userSkills} onRemove={handleRemove} />
      </div>
    </div>
  );
}
