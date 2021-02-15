import React from "react";

import Notification from "./Notification/Notification";

import classes from "./Notifications.module.css";

const Notifications = () => {
    const message = "Hello! Welcome to the RDL!";

    return (
        <div className={classes.Notifications}>
            <Notification message={message} />
        </div>
    );
}

export default Notifications;