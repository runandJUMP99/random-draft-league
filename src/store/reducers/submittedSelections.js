import * as actionTypes from "../actions/actionTypes";

export default (submittedSelections = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_SUBMITTED_SELECTION:
            return [...submittedSelections, action.payload];
        case actionTypes.GET_SUBMITTED_SELECTIONS:
            return action.payload;
        case actionTypes.EDIT_SUBMITTED_SELECTION:
            return submittedSelections.map(selection => selection.id === action.payload.id ? action.payload : selection);
        case actionTypes.CLEAR_SUBMITTED_SELECTIONS:
            return [];
        default:
            return submittedSelections;
    }
}