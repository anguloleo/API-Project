import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviewReducer';
import { useModal } from '../../context/Modal';
import './PostReview.css';



const PostReviewModal = ({spotId, refreshData }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setReview('');
        setStars(0);
        setHovered(0);
        setErrors([]);
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = [];

      if (review.length < 10) newErrors.push('Review must be at least 10 characters.');
      if (stars < 1 || stars > 5) newErrors.push('Please select a star rating.');

      if (newErrors.length) {
        setErrors(newErrors);
        return;
      }

      try {
        await dispatch(createReview({ review, stars, spotId}));
        refreshData();
        closeModal();
      } catch (err) {
        const serverErrors = err.errors || ['Something went wrong.'];
        setErrors(serverErrors);
      }
    };

 
  
    return (
      <div className='post-review-modal'>
        <h2>How was your stay?</h2>

        {errors.length > 0 && (
          <div className='errors'>
            {errors.map((err, i) => <p key={i}>{err}</p>)}
            </div>
        )}
        
        <form className='review-form' onSubmit={handleSubmit}>
            <textarea placeholder='Leave your review here...'
            value={review} onChange={(e) => setReview(e.target.value)} />

          <div className='star-rating-input'>
            {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className={`fa-star ${
                    (hovered || stars) >= star ? `fa-solid filled` : 'fa-regular empty' }`}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setStars(star)} />
            ))}
            <span>Stars</span>
            </div>

          

        <button type="submit" disabled={review.length < 10 || stars === 0}>Submit Your Review</button>
        </form>
      </div>
    );
};



export default PostReviewModal;