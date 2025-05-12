import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spotReducer';
import { Link } from 'react-router-dom';
import './SpotList.css';



const SpotList = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spotState.entries);
    const spots = Object.values(spotsObj);


    useEffect(() => {
        dispatch(fetchSpots());
        }, [dispatch]);


        return (
            <div className='spot-list-container'>
                <div className='grid'>
                    {spots.map(({ id, name, city, state, price, previewImage, avgStarRating }) => (
                        <Link to={`/spots/${id}`} key={id} className ='card-link'>
                        <div className='card' key={id} title={name}>
                            {/*IMAGE*/}
                            <img src={previewImage} className='preview-image' alt={`Preview of spot in ${city}, ${state}`}/>
                            {/*CARD INFO*/}
                            <div className='card-info'>
                                <div className='location-rating'>
                                    {/* CITY, STATE*/}
                                <h3>{city}, {state}</h3>
                                {/* RATING */}
                                <p className='rating'>
                                    <i className='fa-solid fa-star'></i>{' '}
                                    {avgStarRating ? avgStarRating.toFixed(1) : 'New'}
                                </p>
                            </div>
                            <p>${Number(price).toFixed(2)} night</p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
};


export default SpotList;