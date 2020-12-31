import React from "react";

import classes from "./Logo.module.css";
import logo from "../../../assets/images/logo.png";

const Logo = () => {
    return (
        <div className={classes.LogoContainer}>
            <img className={classes.Logo} src={logo} alt="Logo"/>
        </div>
    );
}

export default Logo;