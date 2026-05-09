import SkillBadge from './SkillBadge';
import Button from '../common/Button';

export default function UserSkillList({ skills = [], onRemove }) {
  if (skills.length === 0) {
    return <p style={{ color: '#999', fontSize: '14px' }}>You haven't added any skills yet.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
      {skills.map((s) => (
        <div key={s.id} style={{ position: 'relative' }}>
          <SkillBadge skill={s.skill} level={s.experienceLevel} type={s.type} />
          {onRemove && (
            <button
              onClick={() => onRemove(s.id)}
              style={{
                position: 'absolute', top: '8px', right: '8px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#ff4d4f', fontSize: '16px',
              }}
              title="Remove"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
