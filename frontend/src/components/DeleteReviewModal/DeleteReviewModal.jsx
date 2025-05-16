
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { removeReview } from '../../store/reviewReducer';
import './DeleteReviewModal.css';

const DeleteReviewModal = ({ reviewId, refreshData }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(removeReview(reviewId));
        if (refreshData) refreshData(); 
        closeModal();
    };

    return (
        <div className="delete-confirm-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button className="red-btn" onClick={handleDelete}>Yes (Delete Review)</button>
            <button className="grey-btn" onClick={closeModal}>No (Keep Review)</button>
        </div>
    );
};

export default DeleteReviewModal;

