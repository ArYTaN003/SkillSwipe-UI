import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import userService from '../../services/userService';

export default function EditProfileForm({ user, onSave, loading }) {
  const [form, setForm] = useState({
    userId: user.userId,
    userName: user.userName || '',
    userEmail: user.userEmail || '',
    userBio: user.userBio || '',
  });
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleGenerateBio() {
    setGenerating(true);
    setGenError('');
    try {
      const bio = await userService.generateBio(user.userId);
      setForm((prev) => ({ ...prev, userBio: bio }));
    } catch {
      setGenError('Failed to generate bio. Please try again.');
    } finally {
      setGenerating(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Full Name" name="userName" value={form.userName} onChange={handleChange} required />
      <InputField label="Email" name="userEmail" type="email" value={form.userEmail} onChange={handleChange} required disabled />
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500 }}>Bio</label>
          <button
            type="button"
            onClick={handleGenerateBio}
            disabled={generating}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 500,
              border: '1px solid #6c63ff', background: generating ? '#f0eeff' : '#fff',
              color: '#6c63ff', cursor: generating ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {generating ? (
              <>
                <span style={{
                  width: '12px', height: '12px', border: '2px solid #6c63ff',
                  borderTopColor: 'transparent', borderRadius: '50%',
                  display: 'inline-block', animation: 'spin 0.7s linear infinite',
                }} />
                Generating…
              </>
            ) : '✨ Generate Bio with AI'}
          </button>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <textarea
          name="userBio"
          value={form.userBio}
          onChange={handleChange}
          rows={4}
          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
          placeholder="Tell others about yourself…"
        />
        {genError && (
          <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#ff4d4f' }}>{genError}</p>
        )}
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Save Changes'}</Button>
    </form>
  );
}
