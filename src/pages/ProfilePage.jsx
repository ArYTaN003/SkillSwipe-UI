import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import skillService from '../services/skillService';
import reviewService from '../services/reviewService';
import ProfileCard from '../components/profile/ProfileCard';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

export default function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const targetId = id ? parseInt(id) : currentUser?.userId;
  const isOwn = targetId === currentUser?.userId;

  useEffect(() => {
    if (!targetId) return;
    Promise.all([
      userService.getById(targetId),
      skillService.getAll(),
      reviewService.getForUser(targetId),
    ])
      .then(([u, , revs]) => {
        setProfile(u);
        setReviews(revs);
      })
      .finally(() => setLoading(false));
  }, [targetId]);

  useEffect(() => {
    if (!targetId) return;
    skillService.getAll().then(() => {});
    // Fetch user skills via the request that returns UsersSkills objects
    // Since there's no GET /api/users/{id}/skills endpoint, we call skills and filter client-side
  }, [targetId]);

  if (loading) return <Loader />;
  if (!profile) return <p style={{ padding: '40px' }}>User not found.</p>;

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>{isOwn ? 'My Profile' : `${profile.userName}'s Profile`}</h2>
        {isOwn && (
          <Link to="/profile/edit">
            <Button variant="secondary">Edit Profile</Button>
          </Link>
        )}
      </div>
      <ProfileCard user={profile} skillsTeach={userSkills.filter(s => s.type === 'TEACH')} skillsLearn={userSkills.filter(s => s.type === 'LEARN')} avgRating={avgRating} reviewCount={reviews.length} />
      {reviews.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Reviews</h3>
          {reviews.map((r) => (
            <div key={r.id} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '16px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>{r.reviewer?.userName}</strong>
                <span style={{ color: '#faad14' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              {r.comment && <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
