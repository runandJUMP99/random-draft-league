import React from "react";
import {useSelector} from "react-redux";

import Notification from "./Notification/Notification";

import classes from "./Notifications.module.css";

const Notifications = () => {
    const notifications = useSelector(state => state.notifications);

    return (
        <div className={classes.Notifications}>
            {notifications.map(notification => (
                <Notification message={notification.message} />
            ))}
        </div>
    );
}

export default Notifications;