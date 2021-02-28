import * as actionTypes from "../actions/actionTypes";

const notifications = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_NOTIFICATION: //check first to see if user already has messages. if so, add message object to user object. if not, create new user object then add message object
            let matchedUser = false;

            const updatedNotifications = state.map(notification => {
                if (notification.id === action.payload.userId) {
                    const updatedNotification = {
                        ...notification,
                        [action.payload.notificationId]: action.payload.message
                    };
                    matchedUser = true;

                    return updatedNotification;
                } else {
                    return notification;
                }
            });

            if (!matchedUser) {
                updatedNotifications.push({
                    id: action.payload.userId,
                    [action.payload.notificationId]: action.payload.message
                });
            }

            return updatedNotifications;
        case actionTypes.GET_NOTIFICATIONS:
            return action.payload;
        case actionTypes.DELETE_NOTIFICATION://delete thisIsObject[key]; 
            const updatedNotifs = state.map(notification => {            
                for (let key in notification) {
                    if (key === action.payload) {
                        delete notification[action.payload]
                    }
                }

                return notification;
            });

            return updatedNotifs;
        default:
            return state;
    }
};

export default notifications;