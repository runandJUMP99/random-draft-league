import React, {useState} from "react";
import {useSelector} from "react-redux";

import Selection from "../../../Selections/Selection/Selection";

import classes from "./Round.module.css";

const Round = ({chart}) => {
    return (
        <div className={classes.Round}>
            <h2>Round 1</h2>
            {chart.map(selection => (
                <Selection selectionData={selection} />
            ))}
        </div>
    );
}

export default Round;