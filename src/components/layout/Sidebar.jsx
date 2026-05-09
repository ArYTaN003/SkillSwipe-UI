import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/profile', label: 'My Profile', icon: '👤' },
  { to: '/skills', label: 'Skills', icon: '🧩' },
  { to: '/matches', label: 'Find Matches', icon: '🔍' },
  { to: '/requests', label: 'Requests', icon: '🤝' },
  { to: '/sessions', label: 'Sessions', icon: '📅' },
  { to: '/reviews', label: 'Reviews', icon: '⭐' },
];

const adminLinks = [
  { to: '/admin', label: 'Admin', icon: '🛠️' },
];

export default function Sidebar() {
  const { user } = useAuth();

  const allLinks = user?.userRole === 'ADMIN' ? [...links, ...adminLinks] : links;

  return (
    <aside style={{
      width: '220px', minHeight: 'calc(100vh - 60px)',
      background: '#fafafa', borderRight: '1px solid #e8e8e8',
      padding: '20px 12px', flexShrink: 0,
    }}>
      {allLinks.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '8px',
            textDecoration: 'none', marginBottom: '4px',
            fontSize: '14px', fontWeight: 500,
            color: isActive ? '#6c63ff' : '#555',
            background: isActive ? '#f0eeff' : 'transparent',
          })}
        >
          <span>{icon}</span>
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
