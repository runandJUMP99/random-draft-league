import React from "react";

import Selection from "../../../Selections/Selection/Selection";

import classes from "./Round.module.css";

const Round = ({handleSelection, round, selections}) => {
    return (
        <div className={classes.Round} style={{justifyContent: round % 2 === 0 && "space-between"}}>
            <h2>Round {round}</h2>
            <div className={classes.Selections} style={{flexDirection: round % 2 === 0 && "column-reverse"}}>
                {selections.map(selection => {
                    if (typeof selection === "object") {
                        return (
                            <div key={selection.chartId} onClick={() => handleSelection(selection.id)}>
                                <Selection selectionData={selection} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default Round;