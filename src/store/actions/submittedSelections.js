import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addSubmittedSelection = (selection) => async(dispatch) => {
    try {
        const {data} = await api.addSubmittedSelection(selection);

        const newSelection = {
            ...selection,
            id: data.name
        }
        
        dispatch({type: actionTypes.ADD_SUBMITTED_SELECTION, payload: newSelection});
    } catch(err) {
        console.log(err);
    }
};

export const getSubmittedSelections = () => async(dispatch) => {
    try {
        const fetchedSelections = [];
        const {data} = await api.getSubmittedSelections();

        for (let key in data) {
            fetchedSelections.push({
                ...data[key],
                id: key
            });
        }
        
        dispatch({type: actionTypes.GET_SUBMITTED_SELECTIONS, payload: fetchedSelections});
    } catch(err) {
        console.log(err);
    }
};

export const clearSubmittedSelections = (selections) => (dispatch) => {
    try {
        selections.forEach(selection => {
            api.deleteSubmittedSelection(selection.id);
        });

        dispatch({type: actionTypes.CLEAR_SUBMITTED_SELECTIONS});
    } catch(err) {
        console.log(err);
    }
};