import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {Paper} from "@material-ui/core";

import AddSelection from "./AddSelection/AddSelection";
import Start from "./Start/Start";

import classes from "./Form.module.css";
import {logout} from "../../../store/actions/auth";

const Form = ({darkMode}) => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    return (
        <Paper className={classes.Paper}>
            {token ? <AddSelection /> : <Start darkMode={darkMode} />}
            {token && <p className={classes.Logout} onClick={() => dispatch(logout())}>Logout</p>}
        </Paper>
    );
}

export default Form;