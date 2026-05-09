import SkillTag from './SkillTag';

export default function SkillList({ skills = [], onRemove }) {
  if (skills.length === 0) {
    return <p style={{ color: '#999', fontSize: '14px' }}>No skills added yet.</p>;
  }

  const teaches = skills.filter((s) => s.type === 'TEACH');
  const learns = skills.filter((s) => s.type === 'LEARN');

  return (
    <div>
      {teaches.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>Teaching</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {teaches.map((s) => (
              <SkillTag key={s.id} name={s.skill.skillName} type="TEACH" onRemove={onRemove ? () => onRemove(s.id) : undefined} />
            ))}
          </div>
        </div>
      )}
      {learns.length > 0 && (
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>Learning</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {learns.map((s) => (
              <SkillTag key={s.id} name={s.skill.skillName} type="LEARN" onRemove={onRemove ? () => onRemove(s.id) : undefined} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
