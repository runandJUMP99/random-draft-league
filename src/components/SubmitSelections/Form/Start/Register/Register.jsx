import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux"

import {Button, TextField, Typography} from "@material-ui/core";

import Spinner from "../../../../UI/Spinner/Spinner";

import classes from "./Register.module.css";
import {register, resetPassword} from "../../../../../store/actions/auth";
//signInWithGoogle can be imported from ... ../auth

const Register = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        password: ""
    });
    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();

        if (isResettingPassword) {
            dispatch(resetPassword(userData.email));
            setEmailSent(true);
            setIsResettingPassword(false);
        } else {
            setEmailSent(false);
            dispatch(register(isNewUser, userData));
        }

        handleClear();
    }

    function handleSwitch() {
        setIsNewUser(prevValue => !prevValue);
        
        if (emailSent) {
            setEmailSent(false);
        }
    }

    function handleClear() {
        setUserData({
            email: "",
            name: "",
            password: ""
        });
    }

    return (
        <div className={classes.Register}>
            {loading ? <Spinner />
                : <>
                    <Typography align="center" variant="h6">
                        {isResettingPassword ? "Enter the Email Linked to Your Account to Reset Your Password" : isNewUser ? "Register to Submit an Entry" : "Login to Submit an Entry"}
                    </Typography>
                    <p className={classes.Error}>{error}</p>
                    {emailSent && <p className={classes.EmailSent}>Password Reset Email Sent!</p>}
                    {/* <button className={classes.Google} onClick={() => dispatch(signInWithGoogle())}><i className="fab fa-google"></i> Sign In With Google</button>
                    <p className={classes.Divider}>-OR-</p> */}
                    <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                        {isNewUser && 
                            <TextField 
                                fullWidth 
                                label="Username"
                                margin="normal" 
                                name="username"
                                onChange={(event) => setUserData({...userData, name: event.target.value})} 
                                required
                                value={userData.name}
                                variant="outlined"
                            />
                        }
                        <TextField 
                            fullWidth 
                            label="Email"
                            margin="normal" 
                            name="email"
                            onChange={(event) => setUserData({...userData, email: event.target.value})} 
                            required
                            type="email"
                            value={userData.email}
                            variant="outlined"
                        />
                        {!isResettingPassword && 
                            <TextField 
                                fullWidth 
                                label="Password"
                                margin="normal" 
                                name="password" 
                                onChange={(event) => setUserData({...userData, password: event.target.value})} 
                                required
                                type="password"
                                value={userData.password}
                                variant="outlined"
                            />
                        }
                        <p className={classes.ForgotPassword} onClick={() => setIsResettingPassword(prevValue => !prevValue)}>
                            {isResettingPassword ? "Back to login" : "Forgot password?"}
                        </p>
                        <Button className={classes.ButtonSubmit} color="primary" fullWidth size="large" type="submit" variant="contained">Submit</Button>
                        <Button color="secondary" fullWidth onClick={handleClear} size="small" variant="contained">Clear</Button>
                        <p className={classes.Switch}>
                            {!isNewUser ? "Don't have an account? " : "Already signed up? "} 
                            <span className={classes.SwitchClick} onClick={handleSwitch}>
                                {!isNewUser ? "Register here." : "Login here."}
                            </span>
                        </p>
                    </form>
                </>
            }
        </div>
    );
}

export default Register;