import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';

export default function EditProfileForm({ user, onSave, loading }) {
  const [form, setForm] = useState({
    userId: user.userId,
    userName: user.userName || '',
    userEmail: user.userEmail || '',
    userBio: user.userBio || '',
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>Bio</label>
        <textarea
          name="userBio"
          value={form.userBio}
          onChange={handleChange}
          rows={4}
          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
          placeholder="Tell others about yourself…"
        />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Save Changes'}</Button>
    </form>
  );
}
