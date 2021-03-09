import React from "react";

import Stat from "./Stat/Stat";

import classes from "./Stats.module.css";

const Stats = ({currentUser}) => {
    return (
        <div className={classes.Stats}>
            <Stat name="Pick Total" value={currentUser.pickTotal} />
            <Stat name="Pick Streak" value={currentUser.pickStreak} />
        </div>
    );
}

export default Stats;