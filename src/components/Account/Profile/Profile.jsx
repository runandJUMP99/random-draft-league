import React from "react";
import {useSelector} from "react-redux";

import classes from "./Profile.module.css";
import logo from "../../../assets/images/logo.png";

const Profile = () => {
    const currentUser = useSelector(state => state.auth);
console.log(currentUser);
    return (
        <div className={classes.Profile}>
            <img src={currentUser.img ? currentUser.img : logo} alt="Avatar" />
            <p className={classes.ImageChange}>Change</p>
            <p>Username: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
            <button>Update password?</button>
        </div>
    );
}

export default Profile;