import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import User from "./User/User";

import classes from "./Users.module.css";
import {getNotifications} from "../../../store/actions/notifications";

const Users = ({users}) => {
    const notifications = useSelector(state => state.notifications);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotifications(token));
    }, [dispatch, token]);

    return (
        <div className={classes.Users}>
            {users.map(user => {
                let userNotifications = null;

                notifications.forEach(notification => {
                    if (notification.id === user.id) {
                        userNotifications = notification;
                    }
                });

                return <User 
                    email={user.email}
                    key={user.userId}
                    isFranchise={user.isFranchise}
                    name={user.name}
                    notifications={userNotifications}
                    userId={user.userId}
                />
            })}
        </div>
    );
}

export default Users;