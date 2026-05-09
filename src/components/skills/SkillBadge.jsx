export default function SkillBadge({ skill, level, type }) {
  const levelColors = { BEGINNER: '#87d068', INTERMEDIATE: '#faad14', ADVANCED: '#f5222d' };
  const typeColors = { TEACH: '#1890ff', LEARN: '#6c63ff' };

  return (
    <div style={{
      background: '#fff', border: '1px solid #e8e8e8', borderRadius: '10px',
      padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <span style={{ fontWeight: 600, fontSize: '15px' }}>{skill?.skillName}</span>
      <div style={{ display: 'flex', gap: '6px' }}>
        <span style={{ background: `${typeColors[type]}22`, color: typeColors[type], padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>
          {type}
        </span>
        <span style={{ background: `${levelColors[level]}22`, color: levelColors[level], padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>
          {level}
        </span>
      </div>
    </div>
  );
}
