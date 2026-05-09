import { useEffect, useState } from 'react';
import { useToast } from '../components/common/Toast';
import userService from '../services/userService';
import Loader from '../components/common/Loader';
import Avatar from '../components/common/Avatar';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';

export default function AdminDashboard() {
  const { show } = useToast();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await userService.search(query.trim());
      setUsers(results);
    } catch {
      show('Search failed', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '8px' }}>Admin Dashboard</h2>
      <p style={{ color: '#888', marginBottom: '24px' }}>Manage users and platform data.</p>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #e8e8e8' }}>
        <h3 style={{ marginBottom: '16px' }}>User Search</h3>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '20px' }}>
          <InputField name="query" label="Search by name" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="User name…" style={{ flex: 1, marginBottom: 0 }} />
          <Button type="submit" style={{ marginBottom: '16px' }}>Search</Button>
        </form>
        {loading ? <Loader /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e8e8e8' }}>
                <th style={th}>User</th><th style={th}>Email</th><th style={th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={td}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Avatar name={u.userName} size={28} />
                      {u.userName}
                    </div>
                  </td>
                  <td style={td}>{u.userEmail}</td>
                  <td style={td}>
                    <span style={{ background: u.userRole === 'ADMIN' ? '#fff1f0' : '#f6ffed', color: u.userRole === 'ADMIN' ? '#ff4d4f' : '#52c41a', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                      {u.userRole}
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No users found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const th = { padding: '10px 12px', textAlign: 'left', fontSize: '13px', color: '#888', fontWeight: 600 };
const td = { padding: '12px 12px' };
