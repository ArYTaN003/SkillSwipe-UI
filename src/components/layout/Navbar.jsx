import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import logo from '../../assets/SkillSwipe_Logo.jpeg';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/matches', label: 'Matches' },
  { to: '/requests', label: 'Requests' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/skills', label: 'Skills' },
  { to: '/reviews', label: 'Reviews' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav style={{
      height: '60px', background: '#fff', borderBottom: '1px solid #e8e8e8',
      display: 'flex', alignItems: 'center', padding: '0 24px',
      position: 'sticky', top: 0, zIndex: 100, gap: '8px',
    }}>
      <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '18px', color: '#6c63ff', textDecoration: 'none', marginRight: '24px' }}>
        <img src={logo} alt="SkillSwipe logo" style={{ height: '32px', width: '32px', borderRadius: '6px', objectFit: 'cover' }} />
        SkillSwipe
      </Link>

      <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              padding: '6px 14px', borderRadius: '6px', textDecoration: 'none',
              fontSize: '14px', fontWeight: 500,
              color: pathname === to ? '#6c63ff' : '#555',
              background: pathname === to ? '#f0eeff' : 'transparent',
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#333' }}>
            <Avatar name={user.userName || user.userEmail} size={32} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{user.userName || 'Profile'}</span>
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 14px', background: '#fff', border: '1px solid #d9d9d9',
              borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#555',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
