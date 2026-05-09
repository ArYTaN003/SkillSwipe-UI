import { useState } from 'react';
import Button from '../common/Button';
import InputField from '../common/InputField';

export default function SkillSelector({ skills = [], selectedId, type, level, onChange }) {
  const [search, setSearch] = useState('');

  const filtered = skills.filter((s) =>
    s.skillName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <InputField
        label="Search Skills"
        name="skillSearch"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type to filter…"
      />
      <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #e8e8e8', borderRadius: '8px', marginBottom: '12px' }}>
        {filtered.map((s) => (
          <div
            key={s.skillId}
            onClick={() => onChange('skillId', s.skillId)}
            style={{
              padding: '10px 14px', cursor: 'pointer', fontSize: '14px',
              background: selectedId === s.skillId ? '#f0eeff' : '#fff',
              color: selectedId === s.skillId ? '#6c63ff' : '#333',
              borderBottom: '1px solid #f5f5f5',
            }}
          >
            {s.skillName}
          </div>
        ))}
        {filtered.length === 0 && <p style={{ padding: '12px', color: '#999', fontSize: '14px' }}>No skills found</p>}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#555' }}>Type</label>
          <select
            value={type}
            onChange={(e) => onChange('type', e.target.value)}
            style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px', marginTop: '4px' }}
          >
            <option value="TEACH">I can Teach</option>
            <option value="LEARN">I want to Learn</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#555' }}>Level</label>
          <select
            value={level}
            onChange={(e) => onChange('level', e.target.value)}
            style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px', marginTop: '4px' }}
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
      </div>
    </div>
  );
}
