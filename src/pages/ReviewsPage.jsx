import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import reviewService from '../services/reviewService';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import Loader from '../components/common/Loader';

export default function ReviewsPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await reviewService.getForUser(user.userId);
      setReviews(data);
    } catch {
      show('Failed to load reviews', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (user) load(); }, [user]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Reviews</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>My Reviews</h3>
          {loading ? <Loader /> : <ReviewList reviews={reviews} />}
        </div>
        <ReviewForm onReviewed={load} />
      </div>
    </div>
  );
}
