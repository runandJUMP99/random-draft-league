import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addSelection = (selection, token) => async(dispatch) => {
    try {
        const {data} = await api.addSelection(selection, token);

        const newSelection = {
            ...selection,
            id: data.name,
            isSelected: false
        }
        
        dispatch({type: actionTypes.ADD_SELECTION, payload: newSelection});
    } catch(err) {
        console.log(err);
    }
};

export const getSelections = () => async(dispatch) => {
    try {
        const fetchedSelections = [];
        const {data} = await api.getSelections();

        for (let key in data) {
            if (key !== "chart" && key !== "players" && key !== "submittedselections") {
                fetchedSelections.push({
                    ...data[key],
                    id: key
                });
            }
        }
        
        dispatch({type: actionTypes.GET_SELECTIONS, payload: fetchedSelections});
    } catch(err) {
        console.log(err);
    }
};

export const editSelection = (id, selection, token) => async(dispatch) => {
    try {
        const {data} = await api.editSelection(id, selection, token);
        
        dispatch({type: actionTypes.EDIT_SELECTION, payload: data});
    } catch(err) {
        console.log(err);
    }
};

export const deleteSelection = (id, token) => (dispatch) => {
    try {
        api.deleteSelection(id, token);

        dispatch({type: actionTypes.DELETE_SELECTION, payload: id});
    } catch(err) {
        console.log(err);
    }
};

export const deleteSelections = (selections, token) => (dispatch) => {
    try {
        selections.forEach(selection => {
            api.deleteSelection(selection.id, token);
        });

        dispatch({type: actionTypes.DELETE_SELECTIONS});
    } catch(err) {
        console.log(err);
    }
};

export const setSelectionId = (id) => (dispatch) => {
    try {
        dispatch({type: actionTypes.SET_SELECTION_ID, payload: id});
    } catch(err) {
        console.log(err);
    }
}