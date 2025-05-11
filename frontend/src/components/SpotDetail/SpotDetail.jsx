import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spotReducer';
import { useParams } from 'react-router-dom';
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
        <div className="main-image">Image</div>
        <div className="thumbnail-grid">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="thumbnail">Image</div>
          ))}
        </div>
      </div>

      {/* Host and Description */}
      <div className="details-section">
        <div className="host-info">
          <h2>Hosted by Firstname Lastname</h2>
          <p>{spot.description}</p>
        </div>

        {/* Reservation Box */}
        <div className="reservation-box">
          <div className="reservation-header">
            <span className="price">{spot.price} <span className="night">night</span></span>
            <span className="reviews">★ ★ ★ ★ ☆ · # reviews</span>
          </div>
          <button
            onClick={() => alert("Feature Coming Soon...")}
            className="reserve-button"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};



export default SpotDetail;