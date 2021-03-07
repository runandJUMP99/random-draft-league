import React from "react";

import classes from "./GlobalLoader.module.css";

const GlobalLoader = () => {
    return (
        <div className={classes.GlobalLoader}>
            <img src="https://firebasestorage.googleapis.com/v0/b/randomdraftleague-f6d6d.appspot.com/o/Leash.gif?alt=media&token=2d462cec-ad30-4578-a0f9-ec380ae7eca5" alt="Corgi With Leash"/>
        </div>
    );
}

export default GlobalLoader;