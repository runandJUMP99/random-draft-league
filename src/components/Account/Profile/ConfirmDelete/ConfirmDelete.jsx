import React from "react";
import {useDispatch, useSelector} from "react-redux";

import Spinner from "../../../UI/Spinner/Spinner";

import classes from "./ConfirmDelete.module.css";
import {deleteProfile} from "../../../../store/actions/auth";

const ConfirmDelete = ({setDeleting}) => {
    const loading = useSelector(state => state.auth.loading);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();

    return (
        <div className={classes.ConfirmDelete}>
            {loading ? <Spinner /> : 
                <>
                    <h1>Are you sure you want to delete your profile?</h1>
                    <p>Once confirmed, this account and any information associated with it cannot be recovered.</p>
                    <button onClick={() => dispatch(deleteProfile(userId, token))}>Yes</button>
                    <button className={classes.Delete} onClick={() => setDeleting(false)}>No</button>
                </>
            }
        </div>
    );
}

export default ConfirmDelete;