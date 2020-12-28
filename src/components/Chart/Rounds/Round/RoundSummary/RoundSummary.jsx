import React from "react";

import Selection from "../../../../Selections/Selection/Selection";

import classes from "./RoundSummary.module.css";

const RoundSummary = ({round, selections}) => {
    return (
        <div className={classes.RoundSummary}>
            <h3>Round {round}:</h3>
            <div className={classes.Selections}>
                {selections.map(selection => {
                    if (typeof selection === "object") {
                        return <Selection key={selection.chartId} selectionData={selection} />;
                    }
                })}
            </div>
        </div>
    );
}

export default RoundSummary;