import * as actionTypes from "../actions/actionTypes";

const initialState = {
    chart: [],
    rounds: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CHART:
            return {
                ...state,
                chart: [...state.chart, action.payload]
            };
        case actionTypes.GET_CHART:
            return {
                ...state,
                chart: action.payload
            };
        case actionTypes.REMOVE_FROM_CHART:
            return {
                ...state,
                chart: state.chart.filter(selection => selection.chartId !== action.payload)
            };
        case actionTypes.CLEAR_CHART:
            return {
                chart: [],
                rounds: ""
            };
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