import React, {useState} from "react";
import {useDispatch} from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

import {Button, Paper, TextField, Typography} from "@material-ui/core";

import classes from "./Form.module.css";
import {addSubmittedSelection} from "../../../store/actions/submittedSelections";

const AddSelection = () => {
    const [selectionData, setSelectionData] = useState({
        name: "",
        from: ""
    });
    const [captcha, setCaptcha] = useState(false);
    const dispatch = useDispatch();
    const recaptchaRef = React.createRef();
    
    function handleSubmit(event) {
        event.preventDefault();

        dispatch(addSubmittedSelection(selectionData));
        setSelectionData({
            name: "",
            from: ""
        });

        setCaptcha(false);
        recaptchaRef.current.reset();
    }

    return (
        <Paper className={classes.Paper}>
                <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                    <Typography align="center" variant="h6">Submit Entry</Typography>
                    <TextField 
                        fullWidth 
                        label="Entry Name"
                        margin="normal" 
                        name="entryname"
                        onChange={(event) => setSelectionData({...selectionData, name: event.target.value})} 
                        required
                        value={selectionData.name}
                        variant="outlined" 
                    />
                    <TextField 
                        fullWidth 
                        label="Submitted By"
                        margin="normal" 
                        name="submittedby"
                        onChange={(event) => setSelectionData({...selectionData, from: event.target.value})} 
                        required
                        value={selectionData.from}
                        variant="outlined" 
                    />
                    <div className={classes.Captcha}>
                        <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={() => setCaptcha(true)} />
                    </div>
                    <Button className={classes.ButtonSubmit} color="primary" disabled={!captcha} fullWidth size="large" type="submit" variant="contained">Submit</Button>
                    <Button color="secondary" fullWidth onClick={() => setSelectionData({name: ""})} size="small" variant="contained">Clear</Button>
                </form>
        </Paper>
    );
}

export default AddSelection;