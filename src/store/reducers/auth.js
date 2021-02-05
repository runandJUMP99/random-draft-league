import * as actionTypes from "../actions/actionTypes";

const initialState = {
    error: null,
    token: null,
    userId: null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            return {
                error: null,
                token: action.payload.token,
                userId: action.payload.uid
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                error: null,
                token: null,
                userId: null
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default auth;