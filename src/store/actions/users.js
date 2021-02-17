import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const getUsers = (token) => async(dispatch) => {
    try {
        const fetchedUsers = [];
        const {data} = await api.getUsers(token);

        for (let key in data) {
            fetchedUsers.push({
                ...data[key],
                id: key
            });
        }
        
        dispatch({type: actionTypes.GET_USERS, payload: fetchedUsers});
    } catch(err) {
        console.log(err);
    }
};

export const editUser = (id, user) => async(dispatch) => {
    try {
        const {data} = await api.editUser(id, user);
        
        dispatch({type: actionTypes.EDIT_USER, payload: data});
    } catch(err) {
        console.log(err);
    }
};

export const deleteUser = (id, token) => (dispatch) => {
    try {
        api.deleteUser(id, token);

        dispatch({type: actionTypes.DELETE_USER, payload: id});
    } catch(err) {
        console.log(err);
    }
};