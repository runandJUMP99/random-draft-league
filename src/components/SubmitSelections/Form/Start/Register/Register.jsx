import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux"

import {Button, TextField, Typography} from "@material-ui/core";

import classes from "./Register.module.css";
import {register, signInWithGoogle} from "../../../../../store/actions/auth";

const Register = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        password: ""
    });
    const error = useSelector(state => state.auth.error);
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(register(isNewUser, userData));
        handleClear();
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
            <Typography align="center" variant="h6">{isNewUser ? "Register to Submit an Entry" : "Login to Submit an Entry"}</Typography>
            <p className={classes.Error}>{error}</p>
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
                <Button className={classes.ButtonSubmit} color="primary" fullWidth size="large" type="submit" variant="contained">Submit</Button>
                <Button color="secondary" fullWidth onClick={handleClear} size="small" variant="contained">Clear</Button>
                <p className={classes.Switch}>
                    {!isNewUser ? "Don't have an account? " : "Already signed up? "} 
                    <span className={classes.SwitchClick} onClick={() => setIsNewUser(prevValue => !prevValue)}>
                        {!isNewUser ? "Register here." : "Login here."}
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Register;