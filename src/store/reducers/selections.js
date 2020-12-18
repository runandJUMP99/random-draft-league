import * as actionTypes from "../actions/actionTypes";

export default (selections = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_SELECTION:
            return [...selections, action.payload]; 
        case actionTypes.GET_SELECTIONS:
            return action.payload;
        case actionTypes.EDIT_SELECTION:
            return;
        case actionTypes.DELETE_SELECTION:
            return;   
        default:
            return selections;
    }
}