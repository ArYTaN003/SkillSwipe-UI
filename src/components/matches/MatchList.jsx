import MatchCard from './MatchCard';

export default function MatchList({ matches = [] }) {
  if (matches.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
        <p style={{ fontSize: '40px', margin: '0 0 12px' }}>🔍</p>
        <p>No matches found. Add more skills to find potential partners!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
      {matches.map((u) => (
        <MatchCard key={u.userId} user={u} />
      ))}
    </div>
  );
}
