import * as actionTypes from "../actions/actionTypes";

const notifications = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_NOTIFICATION:
            return [...state, action.payload]
        case actionTypes.GET_NOTIFICATIONS:
            return action.payload;
        case actionTypes.DELETE_NOTIFICATION:
            return state.filter(notification => notification.id !== action.payload);
        default:
            return state;
    }
};

export default notifications;