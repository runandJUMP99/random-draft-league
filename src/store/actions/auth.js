import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const auth = (user) => async(dispatch) => {
    try {
        const authData = {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        };

        const {data} = await api.auth(authData);

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 3000);

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", data.localId);

        dispatch({type: actionTypes.AUTH, payload: data});
        dispatch(checkAuthTimeout(data.expiresIn));
    } catch(err) {
        console.log(err);
        dispatch({type: actionTypes.AUTH_FAIL})
    }
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirdationDate");
    localStorage.removeItem("userId");

    dispatch({type: actionTypes.AUTH_LOGOUT})
};

export const authCheckState = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        
        if (expirationDate >= new Date()) {
            const userId = localStorage.getItem("userId");
            const data = {
                idToken: token,
                localId: userId
            };

            dispatch({type: actionTypes.AUTH, payload: data});
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            dispatch(logout());
        }
    }
};