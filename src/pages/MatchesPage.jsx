import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import userService from '../services/userService';
import FilterBar from '../components/matches/FilterBar';
import MatchList from '../components/matches/MatchList';
import Loader from '../components/common/Loader';

export default function MatchesPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query) {
    if (!query) { setMatches([]); return; }
    setLoading(true);
    try {
      const results = await userService.search(query);
      setMatches(results.filter((u) => u.userId !== user.userId));
    } catch {
      show('Search failed', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '8px' }}>Find Matches</h2>
      <p style={{ color: '#888', marginBottom: '24px' }}>Search for users to exchange skills with.</p>
      <FilterBar onSearch={handleSearch} />
      {loading ? <Loader /> : <MatchList matches={matches} />}
      {!loading && matches.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#bbb' }}>
          <p style={{ fontSize: '48px', margin: '0 0 12px' }}>🔍</p>
          <p>Search by name to discover skill exchange partners.</p>
        </div>
      )}
    </div>
  );
}
