import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spotReducer';
import { Link, useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import { removeSpot } from '../../store/spotReducer';
import { useModal } from '../../context/Modal';
import './ManageSpots.css';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const spotsObj = useSelector(state => state.spotState.entries);
    const currentUser = useSelector(state => state.session.user);
    const spots = Object.values(spotsObj);
    const { setModalContent } = useModal();

 

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    const userSpots = spots.filter(spot => spot.ownerId === currentUser?.id);

    const handleUpdate = (spotId) => {
        navigate(`/spots/${spotId}/edit`); 
    };


    return (
        <div className='manage-spots'>
            <h2>Manage Your Spots</h2>
            <button className='create-button' onClick={() => navigate('/spots/new')}>
                Create a New Spot
            </button>

            <div className='spot-grid'>
                {userSpots.map(({ id, city, state, price, previewImage, avgStarRating }) => (
                    <div className='spot-card-wrapper' key={id}>
                    <Link to={`/spots/${id}`} className='spot-card'>
                        
                            <img src={previewImage} className='preview-image' alt={`Spot in ${city}, ${state}`} />
                        

                        <div className='spot-info'>
                            <div className='location-rating'>
                                <span>{city}, {state}</span>
                                <span>
                                    <i className='fa-solid fa-star'></i>{' '}
                                    {avgStarRating ? avgStarRating.toFixed(1) : 'New'}
                                </span>
                            </div>
                            <div className='price'>
                                <strong>${Number(price).toFixed(2)}</strong> night
                            </div>
                        </div>
                        </Link>


                        <div className='button-row'>
                            <button onClick={() => handleUpdate(id) }>Update</button>
                            <OpenModalButton buttonText='Delete' modalComponent={
                                <DeleteSpotModal
                                spotId={id}
                                onClose={() => setModalContent(null)}
                                onConfirm={async (spotId) => {
                                    await dispatch(removeSpot(spotId));
                                    setModalContent(null);
                                }}
                             />
                        }
/>
</div>
</div>
))}
</div>
</div>
                );
            };

export default ManageSpots;