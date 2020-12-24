import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
    return (
        <button className={classes.Button} onClick={props.onClick} style={props.style}>{props.children}</button>
    );
}

export default Button;