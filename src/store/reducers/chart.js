import * as actionTypes from "../actions/actionTypes";

const initialState = {
    chart: [],
    rounds: ""
}

const chart = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ROUNDS:
            return {
                ...state,
                rounds: action.payload.rounds
            };
        case actionTypes.GET_ROUNDS:
            return {
                ...state,
                rounds: action.payload
            };
        default:
            return state;
    }
};

export default chart;