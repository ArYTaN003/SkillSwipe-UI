import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0eeff 0%, #e6f7ff 100%)',
    }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 8px 32px rgba(108,99,255,0.1)', width: '100%', maxWidth: '420px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 700, color: '#6c63ff' }}>Join SkillSwipe</h1>
        <p style={{ margin: '0 0 28px', color: '#888', fontSize: '15px' }}>Create your account and start learning</p>
        <RegisterForm />
      </div>
    </div>
  );
}
