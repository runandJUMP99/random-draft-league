import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux"

import CloseIcon from '@material-ui/icons/Close';

import classes from "./AccountHeader.module.css";

const AccountHeader = () => {
    const accountName = useSelector(state => state.auth.name);

    return (
        <div className={classes.AccountHeader}>
            <h1>{accountName}</h1>
            <NavLink className={classes.CloseIcon} to="/">
                <CloseIcon fontSize="large" />
            </NavLink>
        </div>
    );
}

export default AccountHeader;