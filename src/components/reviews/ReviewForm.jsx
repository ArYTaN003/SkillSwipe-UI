import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import userService from '../../services/userService';
import requestService from '../../services/requestService';
import reviewService from '../../services/reviewService';
import Modal from '../common/Modal';
import Button from '../common/Button';
import RatingStars from './RatingStars';
import InputField from '../common/InputField';

export default function ReviewForm({ onReviewed }) {
  const { user } = useAuth();
  const { show } = useToast();
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      requestService.getSent(user.userId),
      requestService.getReceived(user.userId),
    ]).then(([s, r]) => {
      const all = [...s, ...r].filter((req) => req.status === 'COMPLETED');
      setCompleted(all);
    });
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selected) { show('Select a completed session', 'error'); return; }
    const reviewedUserId = selected.sender?.userId === user.userId ? selected.receiver?.userId : selected.sender?.userId;
    setSubmitting(true);
    try {
      await reviewService.create({
        reviewer: { userId: user.userId },
        reviewedUser: { userId: reviewedUserId },
        rating,
        comment,
      });
      show('Review submitted!', 'success');
      setSelected(null); setComment(''); setRating(5);
      onReviewed && onReviewed();
    } catch (err) {
      show(err.response?.data || 'Failed to submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #e8e8e8' }}>
      <h3 style={{ marginBottom: '16px' }}>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Completed Session</label>
          <select
            value={selected?.id || ''}
            onChange={(e) => setSelected(completed.find((c) => c.id === parseInt(e.target.value)) || null)}
            style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px' }}
          >
            <option value="">Select a session…</option>
            {completed.map((c) => {
              const other = c.sender?.userId === user.userId ? c.receiver : c.sender;
              return <option key={c.id} value={c.id}>{other?.userName} — {c.offeredSkill?.skillName} ↔ {c.requestedSkill?.skillName}</option>;
            })}
          </select>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, display: 'block', marginBottom: '8px' }}>Rating</label>
          <RatingStars value={rating} onChange={setRating} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
            placeholder="Share your experience…"
          />
        </div>
        <Button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit Review'}</Button>
      </form>
    </div>
  );
}
