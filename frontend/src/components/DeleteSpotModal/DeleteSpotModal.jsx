import './DeleteSpotModal.css';

const DeleteSpotModal = ({ spotId, onClose, onConfirm }) => {
    return(
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to remove this spot?</p>
                <div className='modal-button'>
                    <button className='delete-btn' onClick={() => onConfirm(spotId)}>Yes (Delete Spot)</button>
                    <button className='cancel-btn' onClick={onClose}>No (Keep Spot)</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteSpotModal;