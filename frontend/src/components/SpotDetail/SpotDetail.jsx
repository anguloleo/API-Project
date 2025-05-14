import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spotReducer';
import { useParams } from 'react-router-dom';
import  ReviewList  from '../ReviewList';
import './SpotDetail.css';


const SpotDetail = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spotState.entries[id]);

    useEffect(() => {
        dispatch(fetchSpot(id));
    }, [dispatch, id]);

    if(!spot) return <p>Loading...</p>;
    

    return(
        <div className="spot-container">
      <h1 className="spot-title">{spot.name}</h1>
      <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image">{spot?.SpotImages?.length > 0 && ( <img src={spot.SpotImages.find(img => img.preview)?.url || spot.SpotImages[0].url} alt='Main' style={{width: '100%', height: 'auto'}} />)}</div>

        <div className="thumbnail-grid">
          {spot?.SpotImages?.slice(1, 5).map((image, idx) => (
            <div key={idx} className='thumbnail'>
              <img src={image.url} alt={`Thumbnail ${idx + 1}`}/>
              </div>
          ))}
          </div>
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
      <ReviewList spotId={spot.id} />
    </div>
  );
};



export default SpotDetail;