import React from "react";
import {useSelector} from "react-redux";

import {Paper} from "@material-ui/core";

import AddSelection from "./AddSelection/AddSelection";
import Register from "./Register/Register";

import classes from "./Form.module.css";

const Form = () => {
    const token = useSelector(state => state.auth.token);

    return (
        <Paper className={classes.Paper}>
            {token ? <AddSelection /> : <Register />}
        </Paper>
    );
}

export default Form;