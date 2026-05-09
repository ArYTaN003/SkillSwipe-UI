const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function CalendarView({ sessions = [] }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const sessionDates = new Set(
    sessions.map((s) => new Date(s.createdAt).toDateString())
  );

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e8e8e8' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '16px' }}>{MONTHS[month]} {year}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
        {DAYS.map((d) => (
          <div key={d} style={{ fontSize: '12px', fontWeight: 600, color: '#888', padding: '4px 0' }}>{d}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} />;
          const dateStr = new Date(year, month, d).toDateString();
          const hasSession = sessionDates.has(dateStr);
          const isToday = d === today.getDate();
          return (
            <div key={d} style={{
              padding: '6px 2px', borderRadius: '6px', fontSize: '13px',
              background: isToday ? '#6c63ff' : hasSession ? '#f0eeff' : 'transparent',
              color: isToday ? '#fff' : hasSession ? '#6c63ff' : '#333',
              fontWeight: isToday || hasSession ? 600 : 400,
            }}>
              {d}
            </div>
          );
        })}
      </div>
      {sessions.length > 0 && (
        <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#888' }}>
          Purple dates = active sessions
        </p>
      )}
    </div>
  );
}
