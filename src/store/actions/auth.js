import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";
import firebase from "firebase";
import {storage} from "../../services/firebase";

export const register = (isNewUser, user) => async(dispatch) => {
    try {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        let currentUser;
        let response;

        if (isNewUser) {
            response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            currentUser = firebase.auth().currentUser;
            await currentUser.updateProfile({displayName: user.name});
        } else {
            response = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
            currentUser = firebase.auth().currentUser;
        }
        const token = await firebase.auth().currentUser.getIdToken(true);
        const userData = {
            email: currentUser.email,
            img: currentUser.photoURL,
            name: currentUser.displayName,
            token: token,
            uid: response.user.uid
        }

        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("refreshToken", response.user.refreshToken);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userId", userData.uid);

        dispatch({type: actionTypes.AUTH, payload: userData});
        dispatch(checkAuthTimeout(expirationDate, response.user.refreshToken));
    } catch(err) {
        console.log(err);   
        dispatch({type: actionTypes.AUTH_FAIL, payload: err.message});
    }
}

export const updateProfile = (updatedUser, setIsLoading) => async(dispatch) => {
    try {
        const currentUser = firebase.auth().currentUser;
        const uploadTask = storage.ref(`/profileImgs/${updatedUser.userId}`).put(updatedUser.img);
        setIsLoading(true);
        
        if (updatedUser.email && updatedUser.email !== currentUser.email) {
            console.log("updating email");
            // await currentUser.updateEmail(updatedUser.email);
        }

        if (updatedUser.password) {
            console.log("updating password");
            // await currentUser.updatePassword(updatedUser.password);
        }

        if (updatedUser.img) {
            uploadTask.on("state_changed", snapshot => {
            }, err => {
                console.log(err);
            }, () => {
                storage.ref("profileImgs").child(updatedUser.userId).getDownloadURL()
                    .then(firebaseUrl => {
                        currentUser.updateProfile({
                            displayName: updatedUser.name,
                            photoURL: firebaseUrl
                        });

                        updatedUser = {...updatedUser, img: firebaseUrl}
                        
                        setIsLoading(false);
                        dispatch({type: actionTypes.AUTH_UPDATE_PROFILE, payload: updatedUser})
                    });
            });
        } else {
            currentUser.updateProfile({
                displayName: updatedUser.name
            });
            
            setIsLoading(false);
            dispatch({type: actionTypes.AUTH_UPDATE_PROFILE, payload: updatedUser})
        }
    } catch(err) {
        console.log(err);
        dispatch({type:actionTypes.AUTH_FAIL, payload: err.message});
    }
}

export const checkAuthTimeout = (expirationTime, refreshToken) => (dispatch) => {
    setTimeout(async() => {
        try {
            const {data} = await api.refreshAuth(refreshToken);

            localStorage.setItem("expirationDate", data.expires_in * 1000);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("token", data.id_token);
            localStorage.setItem("userId", data.user_id);
        } catch(err) {
            console.log(err);
        }
    }, expirationTime);
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("expirdationDate");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
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
            const refreshToken = localStorage.getItem("refreshToken");
            const userId = localStorage.getItem("userId");
            const data = {
                token: token,
                uid: userId
            };

            dispatch({type: actionTypes.AUTH, payload: data});
            dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime(), refreshToken));
        } else {
            dispatch(logout());
        }
    }
};



//GOOGLE SIGN IN

// export const signInWithGoogle = () => async(dispatch) => {
//     try {
//         const provider = new firebase.auth.GoogleAuthProvider();
            
//         const response = await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
//         const res = await firebase.auth().signInWithPopup(provider);
//         console.log(response);
//         console.log(res);
//     } catch(err) {
//         dispatch({type: actionTypes.AUTH_FAIL, payload: err.message});
//         console.log(err);
//     }
// }  


//DELETE PROFILE IMG

// if (currentUser.photoURL !== firebaseUrl) {
//     storage.ref(`/profileImgs/${updatedUser.userId}`).delete()
//         .then(() => {
//         })
//         .catch(error => {
//             console.log(error);
//         }); 
// }