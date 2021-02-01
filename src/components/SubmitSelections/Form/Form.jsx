import React from "react";

import {Paper} from "@material-ui/core";

import AddSelection from "./AddSelection/AddSelection";
import Login from "./Login/Login";

import classes from "./Form.module.css";

const Form = () => {
    return (
        <Paper className={classes.Paper}>
            {/* <AddSelection /> */}
            <Login />
        </Paper>
    );
}

export default Form;