import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import {Button, TextField, Typography} from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import classes from "./AddSelection.module.css";
import logo from "../../../../assets/images/logo.png";
import {addSubmittedSelection} from "../../../../store/actions/submittedSelections";

const AddSelection = () => {
    const [selection, setSelection] = useState("");
    const [captcha, setCaptcha] = useState(true);
    const currentUser = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    // const recaptchaRef = React.createRef();
        
    function handleSubmit(event) {
        event.preventDefault();
        const selectionData = {
            name: selection,
            from: currentUser.name
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
                        <NavLink to="/draft"><button className={classes.DraftIcon}>Draft Board</button></NavLink>
                        <NavLink to="/admin"><button className={classes.AdminIcon}>Admin</button></NavLink>
                    </>
                }
                <NavLink to="/account"><AccountCircleIcon className={classes.AccountIcon} fontSize="large" /></NavLink>
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
                <Button className={classes.ButtonSubmit} color="primary" disabled={!captcha} fullWidth size="large" type="submit" variant="contained">Submit</Button>
                <Button color="secondary" fullWidth onClick={() => setSelection("")} size="small" variant="contained">Clear</Button>
            </form>
        </div>
    );
}

export default AddSelection;