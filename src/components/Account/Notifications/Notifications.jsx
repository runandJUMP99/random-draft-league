import React from "react";
import {useSelector} from "react-redux";

import Notification from "./Notification/Notification";
import Stats from "./Stats/Stats";

import classes from "./Notifications.module.css";

const Notifications = () => {
    const userId = useSelector(state => state.auth.userId);
    const currentUser = useSelector(state => state.users).find(user => user.userId === userId);
    const notifications = useSelector(state => state.notifications).filter(notification => notification.id === userId)[0];
    const messages = [];

    for (let key in notifications) {
        if (key !== "id") {
            messages.push(notifications[key]);
        }
    }

    if (messages.length === 0) {
        messages.push({message: "No new notifications. See ya at the draft!"});
    }

    return (
        <div className={classes.Notifications}>
            <Stats currentUser={currentUser} />
            {messages.map(message => (
                <Notification key={message.message} message={message.message} />
            ))
}        </div>
    );
}

export default Notifications;