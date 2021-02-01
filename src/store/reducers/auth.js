import * as actionTypes from "../actions/actionTypes";

const initialState = {
    error: null,
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            return {
                error: null,
                token: action.payload.idToken,
                userId: action.payload.localId
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
}