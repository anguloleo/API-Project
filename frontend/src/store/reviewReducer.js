import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'review/loadReviews';
const LOAD_REVIEW = 'review/loadReview';
const ADD_REVIEW = 'review/addReview';

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    };
};
export const loadReview = (review) => {
    return{
        type: LOAD_REVIEW,
        review
    };
};
export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
};

export const fetchReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}/reviews`);
    if(response.ok){
        const data = await response.json();
    dispatch(loadReviews(data.Reviews));
    }
    
}
export const fetchReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`);
    if(response.ok) {
        const data = await response.json();
        dispatch(loadReview(data));
    }
}
export const createReview = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if(response.ok) {
        const review = await response.json();
        dispatch(addReview(review));
        return review;
    } else {
        const error = await response.json();
        throw error;
    }
};


const initialState = { entries: {}, isLoading: true };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const normalizedReviews = {};
            action.reviews.forEach(review => {
                normalizedReviews[review.id] = review;
            });
            return { ...state, entries: normalizedReviews, isLoading: false };
        }
        case LOAD_REVIEW: {
            return {
                ...state,
                entries: {
                    ...state.entries,
                    [action.review.id]: action.review
                },
                isLoading: false
            };
        }
        case ADD_REVIEW: {
            return {
                ...state, entries: {...state.entries, [action.review.id]: action.review}};
        }
        default: {
            return state;
        }
        
    }
};

export default reviewReducer;