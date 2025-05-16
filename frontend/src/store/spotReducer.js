import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spot/loadSpots';
const LOAD_SPOT = 'spot/loadSpot';
const ADD_SPOT = 'spot/addSpot';
const UPDATE_SPOT = 'spot/updateSpot'

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
export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
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
export const createSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if(response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot));
        return spot;
    } else {
        const error = await response.json();
        throw error;
    }
};
export const editSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

        if(response.ok) {
        const spot = await response.json();
        dispatch(updateSpot(spot));
        return spot;
    } else {
        const error = await response.json();
        throw error;
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
        case ADD_SPOT: {
            return {
                ...state, entries: {...state.entries, [action.spot.id]: action.spot}};
        }
        case UPDATE_SPOT: {
            return {
                ...state, entries: {...state.entries, [action.spot.id]: action.spot}};
        }
        default: {
            return state;
        }
        
    }
};

export default spotReducer;