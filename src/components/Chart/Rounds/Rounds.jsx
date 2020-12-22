import React from "react";

import Round from "./Round/Round";

import classes from "./Rounds.module.css";

const Rounds = ({chart}) => {
    return (
        <div className={classes.Rounds}>
            <Round chart={chart} />
        </div>
    );
}

export default Rounds;