import * as actionTypes from "../actions/actionTypes";

const initialState = {
    error: null,
    email: null,
    img: "",
    loading: false,
    name: null,
    token: null,
    userId: null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            return {
                error: null,
                email: action.payload.email,
                img: action.payload.img,
                loading: false,
                name: action.payload.name,
                token: action.payload.token,
                userId: action.payload.uid
            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_REFRESH:
            return {
                ...state,
                token: action.payload
            };
        case actionTypes.AUTH_UPDATE_PROFILE:
            return {
                ...state, 
                error: null,
                email: action.payload.email,
                img: action.payload.img,
                loading: false,
                name: action.payload.name
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                error: null,
                email: null,
                img: "",
                loading: false,
                name: null,
                token: null,
                userId: null
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default auth;