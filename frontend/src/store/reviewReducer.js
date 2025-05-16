import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'review/loadReviews';
const LOAD_REVIEW = 'review/loadReview';
const ADD_REVIEW = 'review/addReview';
const DELETE_REVIEW = 'review/deleteReview';

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
export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
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
export const createReview = ({review, stars, spotId }) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, stars}),
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data;
    } else {
        const error = await response.json();
        throw error;
    }
};

export const removeReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteReview(reviewId));
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
        case DELETE_REVIEW: {
            const newState = { ...state.entries };
            delete newState[action.reviewId];
            return { ...state, entries: newState };
            

            
        }
        default: {
            return state;
        }
        
    }
};

export default reviewReducer;