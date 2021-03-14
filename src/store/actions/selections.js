import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";
import {updateUsers} from "../actions/users";

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

export const getSelections = (token) => async(dispatch) => {
    try {
        const fetchedSelections = [];
        const {data} = await api.getSelections(token);

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

export const deleteSelections = (selections, token, users) => (dispatch) => {
    try {
        const updatedUsers = {};
        
        selections.forEach(selection => {
            if (selection.isSelected && !selection.honorableMention) {
                const currentUser = users.find(user => user.userId === selection.userId);

                if (currentUser) {
                    updatedUsers[selection.userId] = {...currentUser, pickTotal: currentUser.pickTotal + 1};
                    currentUser.pickTotal++;
                }
            }

            api.deleteSelection(selection.id, token);
        });
        
        users.forEach(user => {
            if (updatedUsers.hasOwnProperty(user.userId)) {
                updatedUsers[user.userId] = {
                    ...updatedUsers[user.userId],
                    pickStreak: updatedUsers[user.userId].pickStreak + 1
                };
            } else {
                updatedUsers[user.userId] = {
                    ...user,
                    pickStreak: 0
                };
            }
        });

        dispatch(updateUsers(updatedUsers, token));
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

export const getSelectionSubject = () => async(dispatch) => {
    try {
        const {data} = await api.getSelectionSubject();
        let name;

        for (let key in data) {
            name = {
                ...data[key],
                id: key
            };
        }

        dispatch({type: actionTypes.SET_SELECTION_SUBJECT, payload: name});
    } catch(err) {
        console.log(err);
    }
};

export const setSelectionSubject = (id, subject, token) => async(dispatch) => {
    try {
        let response;
        
        if (id) {   
            const {data} = await api.setSelectionSubject(id, subject, token);
            response = data;
        } else {  
            const {data} = await api.addSelectionSubject(subject, token);

            response = {
                ...subject,
                id: data.name
            };
        }

        dispatch({type: actionTypes.SET_SELECTION_SUBJECT, payload: response});
    } catch(err) {
        console.log(err);
    }
};