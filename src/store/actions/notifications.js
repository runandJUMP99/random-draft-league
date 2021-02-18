import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addNotification = (id, notification, token) => async(dispatch) => {
    try {console.log(notification);
        await api.addNotification(id, notification, token);
        
        dispatch({type: actionTypes.ADD_NOTIFICATION, payload: notification});
    } catch(err) {
        console.log(err);
    }
};

export const getNotifications = (token) => async(dispatch) => {
    try {
        const fetchedNotifications = [];
        const {data} = await api.getNotifications(token);

        for (let key in data) {
            fetchedNotifications.push({
                ...data[key],
                id: key
            });
        }
        
        dispatch({type: actionTypes.GET_NOTIFICATIONS, payload: fetchedNotifications});
    } catch(err) {
        console.log(err);
    }
};

export const deleteNotification = (id, token) => (dispatch) => {
    try {
        api.deleteNotification(id, token);

        dispatch({type: actionTypes.DELETE_NOTIFICATION, payload: id});
    } catch(err) {
        console.log(err);
    }
};