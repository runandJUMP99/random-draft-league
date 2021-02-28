import React from "react";
import {useDispatch, useSelector} from "react-redux";

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import classes from "./Notification.module.css";
import {deleteNotification} from "../../../../../../store/actions/notifications";

const Notification = ({message, userId}) => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    return (
        <p className={classes.Notification}>
            <em>"{message.message.length >= 28 ? message.message.substring(0, 28) + "..." : message.message}"</em>
            <HighlightOffIcon fontSize="small" onClick={() => dispatch(deleteNotification(message.id, token, userId))} />
        </p>
    );
}

export default Notification;