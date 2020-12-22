import React, {useState} from "react";

import Players from "./Players/Players";
import Rounds from "./Rounds/Rounds";

import classes from "./Chart.module.css";

const Chart = ({chart}) => {
    return (
        <div className={classes.Chart}>
            <Players />
            <Rounds chart={chart} />
        </div>
    );
}

export default Chart;