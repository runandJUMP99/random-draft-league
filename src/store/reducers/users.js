import * as actionTypes from "../actions/actionTypes";

const users = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return action.payload;
        case actionTypes.EDIT_USER:
            return state.map(user => user.userId === action.payload.userId ? action.payload : user);
        case actionTypes.DELETE_USER:
            return state.filter(user => user.id !== action.payload);
        default:
            return state;
    }
};

export default users;