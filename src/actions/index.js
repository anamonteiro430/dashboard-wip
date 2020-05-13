export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
/******************Fetching Swipes**************/
export const getRandom = id => dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios()
        .get(`/matches/matchseeker/${id}`)
        .then(res => {
            console.log('from action', res.data);
            dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FETCH_DATA_FAILURE, payload: err });
        });
};