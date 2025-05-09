import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderMatches } from 'react-router-dom';
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
//fix here
            <div>
            <img src={spotImages.url} alt={spots.name}/>
            <p>{spots.city}, {spots.state}, {reviews.start}</p> 
            <p>{spots.price} night</p>
        </div>

        )

    
}


export default SpotList;