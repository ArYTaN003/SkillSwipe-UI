import RegisterForm from '../components/auth/RegisterForm';
import logo from '../assets/SkillSwipe_Logo.jpeg';

export default function RegisterPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0eeff 0%, #e6f7ff 100%)',
    }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 8px 32px rgba(108,99,255,0.1)', width: '100%', maxWidth: '420px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <img src={logo} alt="SkillSwipe logo" style={{ height: '40px', width: '40px', borderRadius: '10px', objectFit: 'cover' }} />
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#6c63ff' }}>Join SkillSwipe</h1>
        </div>
        <p style={{ margin: '0 0 28px', color: '#888', fontSize: '15px' }}>Create your account and start learning</p>
        <RegisterForm />
      </div>
    </div>
  );
}
