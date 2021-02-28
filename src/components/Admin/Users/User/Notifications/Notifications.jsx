import React from "react";

import Notification from "./Notification/Notification";

import classes from "./Notifications.module.css";

const Notifications = ({notifications, userId}) => {
    const messages = [];

    for (let key in notifications) {
        if (key !== "id") {
            messages.push({
                message: notifications[key].message,
                id: key
            });
        }
    }

    return (
        <div className={classes.Notifications}>
            {messages.map(message => (
                <Notification key={message.id} message={message} userId={userId} />
            ))}
        </div>
    );
}

export default Notifications;