import React from "react";

import Selection from "../../../Selections/Selection/Selection";

import classes from "./Round.module.css";

const Round = ({selections}) => {
    return (
        <div className={classes.Round}>
            <h2>Round 1</h2>
            {selections.map(selection => (
                <Selection key={selection.chartId} selectionData={selection} />
            ))}
        </div>
    );
}

export default Round;