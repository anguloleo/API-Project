import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spotReducer';
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
                <h2>LodgR</h2>
                <div className='grid'>
                    {spots.map(({ id, name, city, state, price, previewImage, avgStarRating }) => (
                        <div className='card' key={id} title={name}>
                            <img src={previewImage} className='preview-image' alt={`Preview of spot in ${city}, ${state}`}/>
                            <div className='card-info'>
                                <div className='location-rating'>
                                <h3>{city}, {state}</h3>
                                <p className='rating'>
                                    <i className='fa-solid fa-star'></i>{' '}
                                    {avgStarRating ? Number(avgStarRating).toFixed(1) : 'New'}
                                </p>
                            </div>
                            <p>${price} night</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
};


export default SpotList;