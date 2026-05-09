import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import userService from '../services/userService';
import EditProfileForm from '../components/profile/EditProfileForm';

export default function EditProfilePage() {
  const { user, refreshUser } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSave(form) {
    setLoading(true);
    try {
      const updated = await userService.update(form);
      refreshUser(updated);
      show('Profile updated!', 'success');
      navigate('/profile');
    } catch {
      show('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Edit Profile</h2>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', border: '1px solid #e8e8e8' }}>
        <EditProfileForm user={user} onSave={handleSave} loading={loading} />
      </div>
    </div>
  );
}
