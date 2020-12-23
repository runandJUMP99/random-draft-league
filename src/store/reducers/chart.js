import * as actionTypes from "../actions/actionTypes";

export default (chart = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CHART:
            return [...chart, action.payload];
        case actionTypes.GET_CHART:
            return action.payload;
        case actionTypes.REMOVE_FROM_CHART:
            return chart.filter(selection => selection.id !== action.payload);
        case actionTypes.CLEAR_CHART:
            return [];
        default:
            return chart;
    }
}