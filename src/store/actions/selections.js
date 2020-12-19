import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addSelection = (selection) => async(dispatch) => {
    try {
        const {data} = await api.addSelection(selection);

        const newSelection = {
            ...selection,
            id: data.name
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
            fetchedSelections.push({
                ...data[key],
                id: key
            });
        }
        
        dispatch({type: actionTypes.GET_SELECTIONS, payload: fetchedSelections});
    } catch(err) {
        console.log(err);
    }
}

export const editSelection = (id, selection) => async(dispatch) => {
    try {
        const {data} = await api.editSelection(id, selection);

        dispatch({type: actionTypes.EDIT_SELECTION, payload: data});
    } catch(err) {
        console.log(err);
    }
}