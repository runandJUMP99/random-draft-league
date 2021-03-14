import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import MessageIcon from '@material-ui/icons/Message';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SendIcon from '@material-ui/icons/Send';
import StarsIcon from '@material-ui/icons/Stars';

import Notifications from "./Notifications/Notifications";

import classes from "./User.module.css";
import {editUser} from "../../../../store/actions/users";
import {addNotification} from "../../../../store/actions/notifications";

const User = ({email, isFranchise, isWinner, name, notifications, order, userId}) => {
    const [viewNotifications, setViewNotifications] = useState(false);
    const [isMessaging, setIsMessaging] = useState(false);
    const [newNotification, setNewNotification] = useState({message: ""});
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    function handleAddFranchise() {
        const updatedUser = {
            email: email,
            isFranchise: !isFranchise,
            isWinner: isWinner,
            name: name,
            order: isFranchise ? 0 : order,
            userId: userId
        };

        dispatch(editUser(userId, updatedUser));
    }

    function handleIsWinner() {
        const updatedUser = {
            email: email,
            isFranchise: isFranchise,
            isWinner: !isWinner,
            name: name,
            userId: userId
        }

        dispatch(editUser(userId, updatedUser));
    }
    
    function handleSubmit() {
        if (newNotification.message !== "") {
            dispatch(addNotification(userId, newNotification, token));
        }
        
        setNewNotification({message: ""});
        setIsMessaging(false);
    }

    if (viewNotifications && !notifications) {
        setViewNotifications(false);
    }

    return (
        <div className={classes.User}>
            {(viewNotifications && Object.keys(notifications).length > 1) ? <Notifications notifications={notifications} userId={userId} /> : isMessaging
                ? <textarea 
                    cols="30"
                    rows="4"
                    onChange={(event) => setNewNotification({message: event.target.value})}
                    placeholder="New Notification..."
                    value={newNotification.message}
                />
                : <>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p className={classes.ID}><strong>ID:</strong> {userId}</p>
                </>
            } 
            <div className={classes.Icons}>
                <span className={classes.Icon } onClick={handleIsWinner}><i className="fas fa-crown" style={{color: isWinner && "#eca2af"}}></i></span>
                {Object.keys(notifications).length > 1 //check if notifications object has notifications in it
                    ? <NotificationsActiveIcon className={classes.NotificationsActive} onClick={() => setViewNotifications(prevValue => !prevValue)} />
                    : <NotificationsIcon className={classes.NotificationsOff} />
                }
                <StarsIcon className={classes.Icon} onClick={handleAddFranchise} style={{color: isFranchise && "#18b618"}} />
                {isMessaging
                    ? <SendIcon className={classes.Icon} onClick={handleSubmit} />
                    : <MessageIcon className={classes.Icon} onClick={() => setIsMessaging(true)} />
                }
            </div>
        </div>
    );
}

export default User;