import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import InputField from '../common/InputField';
import Button from '../common/Button';

export default function RegisterForm() {
  const [form, setForm] = useState({ userName: '', userEmail: '', userPassword: '', userBio: '' });
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      await login(form.userEmail, form.userPassword);
      show('Welcome to SkillSwipe! Let\'s set up your skills.', 'success');
      navigate('/onboarding');
    } catch (err) {
      show(err.response?.data || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
      <InputField label="Full Name" name="userName" value={form.userName} onChange={handleChange} required placeholder="Jane Doe" />
      <InputField label="Email" name="userEmail" type="email" value={form.userEmail} onChange={handleChange} required placeholder="you@example.com" />
      <InputField label="Password" name="userPassword" type="password" value={form.userPassword} onChange={handleChange} required placeholder="Min. 6 characters" />
      <InputField label="Bio" name="userBio" value={form.userBio} onChange={handleChange} placeholder="Tell others about yourself…" />
      <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '8px' }}>
        {loading ? 'Creating account…' : 'Create Account'}
      </Button>
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#666' }}>
        Already registered? <Link to="/login" style={{ color: '#6c63ff' }}>Sign in</Link>
      </p>
    </form>
  );
}
