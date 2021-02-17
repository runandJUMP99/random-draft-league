import React from "react";

import classes from "./User.module.css";

const User = ({email, name, userId}) => {
    return (
        <div className={classes.User}>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>ID: {userId}</p>
        </div>
    );
}

export default User;