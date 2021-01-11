import * as actionTypes from "../actions/actionTypes";

const initialState = {
    chart: [],
    rounds: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ROUNDS:
            return {
                ...state,
                rounds: action.payload
            };
        case actionTypes.GET_ROUNDS:
            return {
                ...state,
                rounds: action.payload
            };
        default:
            return state;
    }
}