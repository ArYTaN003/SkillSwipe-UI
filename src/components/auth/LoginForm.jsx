import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import InputField from '../common/InputField';
import Button from '../common/Button';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      show('Welcome back!', 'success');
      navigate('/dashboard');
    } catch {
      show('Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
      <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
      <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />
      <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '8px' }}>
        {loading ? 'Signing in…' : 'Sign In'}
      </Button>
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#666' }}>
        No account? <Link to="/register" style={{ color: '#6c63ff' }}>Register</Link>
      </p>
    </form>
  );
}
