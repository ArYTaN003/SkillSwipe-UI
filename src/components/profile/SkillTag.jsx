const typeColors = {
  TEACH: { bg: '#e6f7ff', text: '#1890ff' },
  LEARN: { bg: '#f0eeff', text: '#6c63ff' },
};

export default function SkillTag({ name, type = 'TEACH', onRemove }) {
  const colors = typeColors[type] || typeColors.TEACH;
  return (
    <span style={{
      background: colors.bg, color: colors.text,
      padding: '4px 12px', borderRadius: '20px', fontSize: '13px',
      display: 'inline-flex', alignItems: 'center', gap: '6px',
    }}>
      {name}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text, fontSize: '14px', lineHeight: 1, padding: 0 }}
        >
          ×
        </button>
      )}
    </span>
  );
}
