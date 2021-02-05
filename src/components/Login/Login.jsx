import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import {Button, Paper, TextField, Typography} from "@material-ui/core";

import Logo from "../UI/Logo/Logo";

import classes from "./Login.module.css";
import {register} from "../../store/actions/auth";

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const error = useSelector(state => state.auth.error);
    const userId = useSelector(state => state.auth.userId);
    const isAuthenticated = useSelector(state =>  state.auth.token !== null);
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(register(false, loginForm.email, loginForm.password));
    }
    
    return (
        <div className={classes.Login}>
            {isAuthenticated
                && (userId === process.env.REACT_APP_FIREBASE_UID1 || userId === process.env.REACT_APP_FIREBASE_UID2
                ? <Redirect to="/" />
                : <Redirect to="/submit" />)
            }
            <Paper className={classes.Paper}>
                <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                    <Typography align="center" variant="h6" style={{color: error && "red"}}>
                        {!error ? "Random Draft League  " : "Invalid Login. Please Try Again"}
                    </Typography>
                    <TextField 
                        fullWidth 
                        label="Email"
                        margin="normal"     
                        name="email"
                        onChange={(event) => setLoginForm({...loginForm, email: event.target.value})} 
                        required
                        state="email"
                        value={loginForm.email}
                        variant="outlined" 
                    />
                    <TextField 
                        fullWidth 
                        label="Password" 
                        margin="normal"
                        name="password"
                        onChange={(event) => setLoginForm({...loginForm, password: event.target.value})} 
                        required
                        type="password"
                        value={loginForm.password}
                        variant="outlined" 
                    />
                    <Button className={classes.ButtonSubmit} color="primary" fullWidth size="large" type="submit" variant="contained">Login</Button>
                </form>
            </Paper>
            <Logo />
        </div>
    );
}

export default Login;