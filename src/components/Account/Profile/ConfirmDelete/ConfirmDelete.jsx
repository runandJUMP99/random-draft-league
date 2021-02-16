import React from "react";
import {useDispatch} from "react-redux";

import classes from "./ConfirmDelete.module.css";
import {deleteProfile} from "../../../../store/actions/auth";

const ConfirmDelete = ({setDeleting}) => {
    const dispatch = useDispatch();

    return (
        <div className={classes.ConfirmDelete}>
            <h1>Are you sure you want to delete your profile?</h1>
            <p>Once confirmed, this account and any information associated with it cannot be recovered.</p>
            <button onClick={() => dispatch(deleteProfile())}>Yes</button>
            <button className={classes.Delete} onClick={() => setDeleting(false)}>No</button>
        </div>
    );
}

export default ConfirmDelete;