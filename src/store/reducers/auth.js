import * as actionTypes from "../actions/actionTypes";

const initialState = {
    error: null,
    isAdmin: false,
    token: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            return {
                error: null,
                isAdmin: action.payload.isAdmin,
                token: action.payload.token
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                error: null,
                isAdmin: false,
                token: null
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}