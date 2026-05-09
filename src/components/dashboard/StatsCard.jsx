export default function StatsCard({ label, value, icon, color = '#6c63ff' }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '12px', padding: '20px',
      border: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', gap: '16px',
    }}>
      <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '26px', fontWeight: 700, color }}>{value ?? '—'}</p>
        <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>{label}</p>
      </div>
    </div>
  );
}
