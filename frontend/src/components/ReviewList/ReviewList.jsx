import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../store/reviewReducer';
import { useModal } from '../../context/Modal';
import PostReviewModal from '../PostReviewModal';
import './ReviewList.css';


const ReviewList = ({ spotId, refreshData }) => {
    const dispatch = useDispatch();
    const allReviews = useSelector(state=>state.reviewState.entries);
    const reviews = Object.values(allReviews).filter(review => review.spotId === spotId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const currentUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spotState.entries[spotId]);
    const { setModalContent } = useModal();

    useEffect(() => {
        if (spotId) dispatch(fetchReviews(spotId));
        }, [dispatch, spotId]);

        const avgRating = spot?.avgStarRating;
        const reviewCount = spot?.numReviews;
        const hasReviewed = reviews.some(review => review.userId === currentUser?.id);

        return (
            <div className='review-section'>

                {/* Rating Header*/}
                <div className='review-header'>
                    <i className='fa-solid fa-star'></i>
                    <span>{avgRating ? Number(avgRating).toFixed(1) : 'New'}</span>
                    {reviewCount > 0 && (
                        <span> · {reviewCount} review{reviewCount === 1 ? '' : 's'}</span>
                    )}
                </div>

                {/* POST REVIEW BUTTON*/}
                {currentUser && currentUser.id !== spot?.ownerId && !hasReviewed && (
                    <button className='post-review-btn' onClick={() => setModalContent(<PostReviewModal spotId={spotId} refreshData={refreshData}/>)}>Post Your Review</button>
                )}

                {/* REVIEWS */}
                {reviews.length ? (
                    reviews.map(({ id, createdAt, review, User }) => (
                                <div className='review-box' key={id}>
                                <h3>{User?.firstName}</h3>
                                <p className='review-date'>
                                {new Date(createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long' })} </p>
                                <p>{review}</p>
                                </div>
                    ))
                ) : currentUser && currentUser.id !== spot?.ownerId ? (
                    <p>Be the first to post a review!</p>
                ) : null}
            </div>
        );
    }

export default ReviewList;