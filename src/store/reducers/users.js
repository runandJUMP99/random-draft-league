import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: []
}

const users = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return action.payload;
        case actionTypes.EDIT_USER:
            return state.users.map(user => user.id === action.payload.id ? action.payload : user);
        case actionTypes.DELETE_USER:
            return state.users.filter(user => user.id !== action.payload);
        default:
            return state;
    }
};

export default users;