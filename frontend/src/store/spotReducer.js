const LOAD_SPOTS = 'spot/loadSpots';
const LOAD_SPOT = 'spot/loadSpot';
const ADD_SPOT = 'spot/addSpot';

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};
export const loadSpot = (spot) => {
    return{
        type: LOAD_SPOT,
        spot
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
    dispatch(loadSpots(data.Spots));
}
export const fetchSpot = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);
    if(response.ok) {
        const data = await response.json();
        dispatch(loadSpot(data));
    }
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
        case LOAD_SPOT: {
            return {
                ...state,
                entries: {
                    ...state.entries,
                    [action.spot.id]: action.spot
                },
                isLoading: false
            };
        }
        default: {
            return state;
        }
        
    }
};

export default spotReducer;