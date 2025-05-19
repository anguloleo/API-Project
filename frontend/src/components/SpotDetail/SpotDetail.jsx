import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spotReducer';
import { fetchReviews } from '../../store/reviewReducer';
import { useParams } from 'react-router-dom';
import  ReviewList  from '../ReviewList';
import './SpotDetail.css';


const SpotDetail = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spotState.entries[id]);

    const refreshData = () => {
      dispatch(fetchSpot(id));
      dispatch(fetchReviews(id));
    };

    useEffect(() => {
        dispatch(fetchSpot(id));
        dispatch(fetchReviews(id));
    }, [dispatch, id]);

    if(!spot) return <p>Loading...</p>;
    

    return(
        <div className="spot-container">
      <h1 className="spot-title">{spot.name}</h1>
      <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>

      {/* Image Gallery */}
      <div className="image-gallery">
        
          {spot?.SpotImages?.length > 0 && ( 
            <>
            <div className="main-image">
            <img 
            src={spot.SpotImages.find(img => img.preview)?.url || spot.SpotImages[0].url} alt='Main'  />
        </div>

          {spot?.SpotImages.filter(img => !img.preview).slice(0, 4).map((image, idx) => (
            <div key={idx} className='thumbnail'>
              <img src={image.url} alt={`Thumbnail ${idx + 1}`}/>
              </div>
          ))}
          </>
          )}
      </div>

      {/* Host and Description */}
      <div className="details-section">
        <div className="host-info">
          {spot.Owner && (<h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>)}
          
          <p>{spot.description}</p>
        </div>

        {/* Reservation Box */}
        <div className="reservation-box">
          <div className="reservation-header">
            <span className="price">${Number(spot.price).toFixed(2)} <span className="night">night</span></span>
             <span className='rating'>
              <i className='fa-solid fa-star'></i>{' '}
                                    {spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : 'New'}
                                </span>
            <span className="reviews">{spot.numReviews} reviews</span>
          </div>
          <button
            onClick={() => alert("Feature Coming Soon...")}
            className="reserve-button"
          >
            Reserve
          </button>
        </div>
      </div>
      <ReviewList spotId={spot.id} refreshData={refreshData} />
    </div>
  );
};



export default SpotDetail;