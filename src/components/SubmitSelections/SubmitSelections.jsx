import React from "react";

import Form from "./Form/Form";
import Logo from "../UI/Logo/Logo";
import SubmittedSelections from "./SubmittedSelections/SubmittedSelections";

import classes from "./SubmitSelections.module.css";

const SubmitSelections = () => {
    return (
        <div className={classes.SubmitSelections}>
            <SubmittedSelections />
            <Form />
            <div className={classes.Logo}>
                <Logo />
            </div>
        </div>
    );
}

export default SubmitSelections;