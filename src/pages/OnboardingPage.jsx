import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import skillService from '../services/skillService';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

export default function OnboardingPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [teachIds, setTeachIds] = useState(new Set());
  const [learnIds, setLearnIds] = useState(new Set());
  const [search, setSearch] = useState('');

  useEffect(() => {
    skillService.getAll()
      .then(setAllSkills)
      .catch(() => show('Could not load skills', 'error'))
      .finally(() => setLoading(false));
  }, []);

  function toggleTeach(id) {
    setTeachIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleLearn(id) {
    setLearnIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = allSkills.filter((s) =>
    s.skillName.toLowerCase().includes(search.toLowerCase())
  );

  async function handleContinue() {
    if (teachIds.size === 0 && learnIds.size === 0) {
      show('Please select at least one skill', 'error');
      return;
    }
    setSaving(true);
    try {
      const tasks = [];
      for (const id of teachIds) {
        tasks.push(skillService.addToUser({
          user: { userId: user.userId },
          skill: { skillId: id },
          type: 'TEACH',
          experienceLevel: 'INTERMEDIATE',
        }));
      }
      for (const id of learnIds) {
        tasks.push(skillService.addToUser({
          user: { userId: user.userId },
          skill: { skillId: id },
          type: 'LEARN',
          experienceLevel: 'BEGINNER',
        }));
      }
      await Promise.all(tasks);
      show('Skills saved! Welcome to SkillSwipe.', 'success');
      navigate('/dashboard');
    } catch {
      show('Failed to save skills', 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader message="Loading skills…" />;

  const pillStyle = (selected, color) => ({
    padding: '7px 14px',
    borderRadius: '20px',
    border: `2px solid ${selected ? color : '#e0e0e0'}`,
    background: selected ? `${color}18` : '#fff',
    color: selected ? color : '#666',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: selected ? 600 : 400,
    transition: 'all 0.15s',
    userSelect: 'none',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0eeff 0%, #e6f7ff 100%)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '40px 16px',
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px',
        padding: '40px 36px', boxShadow: '0 8px 40px rgba(108,99,255,0.12)',
        width: '100%', maxWidth: '780px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 800, color: '#6c63ff' }}>
            Set up your skills
          </h1>
          <p style={{ margin: 0, color: '#888', fontSize: '15px' }}>
            Tell us what you can teach and what you want to learn. You can always update this later.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search skills…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '10px 16px', borderRadius: '10px',
            border: '1px solid #d9d9d9', fontSize: '14px',
            marginBottom: '28px', boxSizing: 'border-box',
            outline: 'none',
          }}
        />

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '36px' }}>
          {/* Teach */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{
                background: '#1890ff18', color: '#1890ff',
                padding: '4px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
              }}>I can Teach</span>
              {teachIds.size > 0 && (
                <span style={{ fontSize: '12px', color: '#1890ff', fontWeight: 500 }}>
                  {teachIds.size} selected
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '340px', overflowY: 'auto' }}>
              {filtered.map((s) => (
                <span
                  key={s.skillId}
                  onClick={() => toggleTeach(s.skillId)}
                  style={pillStyle(teachIds.has(s.skillId), '#1890ff')}
                >
                  {s.skillName}
                </span>
              ))}
              {filtered.length === 0 && <p style={{ color: '#bbb', fontSize: '13px' }}>No skills found</p>}
            </div>
          </div>

          {/* Learn */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{
                background: '#6c63ff18', color: '#6c63ff',
                padding: '4px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
              }}>I want to Learn</span>
              {learnIds.size > 0 && (
                <span style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 500 }}>
                  {learnIds.size} selected
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '340px', overflowY: 'auto' }}>
              {filtered.map((s) => (
                <span
                  key={s.skillId}
                  onClick={() => toggleLearn(s.skillId)}
                  style={pillStyle(learnIds.has(s.skillId), '#6c63ff')}
                >
                  {s.skillName}
                </span>
              ))}
              {filtered.length === 0 && <p style={{ color: '#bbb', fontSize: '13px' }}>No skills found</p>}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '14px' }}
          >
            Skip for now
          </button>
          <Button onClick={handleContinue} disabled={saving}>
            {saving ? 'Saving…' : 'Continue →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
