import * as actionTypes from "../actions/actionTypes";
import firebase from "firebase";

export const register = (isNewUser, email, password, isAdmin) => async(dispatch) => {
    try {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        let response;
        
        if (isNewUser) {
            response = await firebase.auth().createUserWithEmailAndPassword(email, password);
        } else {
            response = await firebase.auth().signInWithEmailAndPassword(email, password);
        }
        console.log(response);
        const {user} = response;
        const userData = {
            isAdmin: isAdmin,
            token: user.refreshToken
        }

        localStorage.setItem("token", userData.token);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch({type: actionTypes.AUTH, payload: userData});
        dispatch(checkAuthTimeout(expirationDate));
    } catch(err) {
        dispatch({type: actionTypes.AUTH_FAIL, payload: err.message});
    }
}

export const signInWithGoogle = () => async(dispatch) => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
            
        const response = await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        const res = await firebase.auth().signInWithPopup(provider);
        console.log(response);
        console.log(res);
    } catch(err) {
        dispatch({type: actionTypes.AUTH_FAIL, payload: err.message});
        console.log(err);
    }
}

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime);
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