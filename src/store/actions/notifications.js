import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addNotification = (userId, notification, token) => async(dispatch) => {
    try {
        const {data} = await api.addNotification(userId, notification, token);
        const messageData = {   //create message data object to match how objects appear in firebase. this helps other components GET and access data properly when new notifications are added
            notificationId: data.name,
            message: notification,
            userId: userId
        };

        dispatch({type: actionTypes.ADD_NOTIFICATION, payload: messageData});
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

export const deleteNotification = (id, token, userId) => (dispatch) => {
    try {
        api.deleteNotification(id, token, userId);

        dispatch({type: actionTypes.DELETE_NOTIFICATION, payload: id});
    } catch(err) {
        console.log(err);
    }
};