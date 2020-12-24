import React from "react";

import classes from "./Player.module.css";

const Player = ({name}) => {
    return (
        <div className={classes.Player}>
            {name}
        </div>
    );
}

export default Player;