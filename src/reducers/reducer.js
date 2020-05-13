import {
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,

} from '../actions';

const initialState = {
    isLoading: false,
    random: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        // *****************  GET
        case FETCH_DATA_START:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_DATA_SUCCESS:
            console.log('passing data to reducer');
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
