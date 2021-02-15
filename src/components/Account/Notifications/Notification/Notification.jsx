import React from "react";

import classes from "./Notification.module.css";

const Notification = ({message}) => {
    return (
        <p className={classes.Notification}>{message}</p>
    );
}

export default Notification;