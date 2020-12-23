import React from "react";

import Players from "./Players/Players";
import Rounds from "./Rounds/Rounds";

import classes from "./Chart.module.css";

const Chart = () => {
    return (
        <div className={classes.Chart}>
            <Players />
            <Rounds />
        </div>
    );
}

export default Chart;