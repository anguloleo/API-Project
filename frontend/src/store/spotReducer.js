const LOAD_SPOTS = 'spot/loadSpots';
const ADD_SPOT = 'spot/addSpot';

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};
export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const data = await response.json();
    console.log("Fetched spots data:", data);
    dispatch(loadSpots(data.Spots));
}


const initialState = { entries: {}, isLoading: true };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const normalizedSpots = {};
            action.spots.forEach(spot => {
                normalizedSpots[spot.id] = spot;
            });
            return { ...state, entries: normalizedSpots, isLoading: false };
        }
        default: {
            return state;
        }
        
    }
};

export default spotReducer;