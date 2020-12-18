import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addSelection = (selection) => async(dispatch) => {
    try {
        await api.addSelection(selection);
        dispatch({type: actionTypes.ADD_SELECTION, payload: selection});
    } catch(err) {
        console.log(err);
    }
};

export const getSelections = () => async(dispatch) => {
    try {
        const {data} = await api.getSelections();
        console.log(data);
    } catch(err) {
        console.log(err);
    }
}