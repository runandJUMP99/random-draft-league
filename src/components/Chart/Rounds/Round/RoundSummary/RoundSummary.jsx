import React from "react";
import {useSelector} from "react-redux";

import Selection from "../../../../Selections/Selection/Selection";

import classes from "./RoundSummary.module.css";

const RoundSummary = ({round, selections}) => {
    const players = useSelector(state => state.players.players);
    let count = -1;

    if (round % 2 === 0) {
        selections = selections.reverse();
    }

    return (
        <div className={classes.RoundSummary}>
            <h2>Round {round}</h2>
            <div className={classes.Selections}>
                {selections.map(selection => {
                    if (typeof selection === "object") {
                        count++
                        return (
                            <div key={selection.chartId} className={classes.Summary}>
                                <h4>{players[count].name.substring(0, 13)}:</h4>
                                <Selection selectionData={selection} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default RoundSummary;