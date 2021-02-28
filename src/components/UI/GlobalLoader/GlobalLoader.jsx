import React from "react";

import classes from "./GlobalLoader.module.css";

const GlobalLoader = () => {
    return (
        <img className={classes.GlobalLoader} src="https://firebasestorage.googleapis.com/v0/b/randomdraftleague-f6d6d.appspot.com/o/giphy.gif?alt=media&token=c0679a6e-2f9f-4901-9bb0-0bf7ebd699b0" alt="Corgi With Leash"/>
    );
}

export default GlobalLoader;