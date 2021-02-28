import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import {Button, TextField, Typography} from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import classes from "./AddSelection.module.css";
import logo from "../../../../assets/images/logo.png";
import {getNotifications} from "../../../../store/actions/notifications";
import {addSubmittedSelection} from "../../../../store/actions/submittedSelections";

const AddSelection = () => {
    const [selection, setSelection] = useState("");
    const [captcha, setCaptcha] = useState(true);
    const currentUser = useSelector(state => state.auth);
    const submittedSelections = useSelector(state => state.submittedSelections);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const notifications = useSelector(state => state.notifications).filter(notification => notification.id === userId);
    const dispatch = useDispatch();
    const currentUserSubmissions = submittedSelections.filter(selection => currentUser.name === selection.from);
    // const recaptchaRef = React.createRef();

    useEffect(() => {
        dispatch(getNotifications(token));
    }, [dispatch, token]);

    function handleSubmit(event) {
        event.preventDefault();
        const selectionData = {
            from: currentUser.name,
            name: selection,
            userId: userId
        };
        
        dispatch(addSubmittedSelection(selectionData, token));
        setSelection("");

        // setCaptcha(false);
        // recaptchaRef.current.reset();
    }


    return (
        <div className={classes.AddSelection}>
            <img src={currentUser.img ? currentUser.img : logo} alt="Profile" />
            <Typography align="center" variant="h6">Submit An Entry</Typography>
            <div className={classes.IconButtons}>
                {(userId === process.env.REACT_APP_FIREBASE_UID1 || userId === process.env.REACT_APP_FIREBASE_UID2) &&
                    <>
                        <NavLink to="/draft"><button className={classes.DraftIcon}>Draft</button></NavLink>
                        <NavLink to="/admin"><button className={classes.AdminIcon}>Admin</button></NavLink>
                    </>
                }
                <NavLink className={classes.AccountIconGroup} to="/account">
                    <AccountCircleIcon className={classes.AccountIcon} fontSize="large" />
                    {notifications.length > 0 && <PriorityHighIcon className={classes.NotificationAlert} fontSize="small" />}
                </NavLink>
            </div>
            <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                <TextField 
                    fullWidth 
                    label="Entry Name"
                    margin="normal" 
                    name="entryname"
                    onChange={(event) => setSelection(event.target.value)} 
                    required
                    value={selection}
                    variant="outlined" 
                />
                <div className={classes.Captcha}>
                    {/* <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={() => setCaptcha(true)} /> */}
                </div>
                <Button
                    className={classes.ButtonSubmit}
                    color="primary" disabled={!captcha || currentUserSubmissions.length >= 3}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                        {currentUserSubmissions.length >= 3 ? "Max 3 Submissions Per Draft" : "Submit"}
                </Button>
                <Button
                    color="secondary"
                    fullWidth
                    onClick={() => setSelection("")}
                    size="small"
                    variant="contained"
                >
                    Clear
                </Button>
            </form>
        </div>
    );
}

export default AddSelection;