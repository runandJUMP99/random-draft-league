import React from "react";
import {useSelector} from "react-redux";

import Selection from "../../../../Selections/Selection/Selection";

import classes from "./PlayerSummary.module.css";

const PlayerSummary = ({player}) => {
    const chart = useSelector(state => state.chart);
    const playerSummary = chart.filter(selection => selection.player === player.playerId);
    let round = 0;

    return (
        <div className={classes.PlayerSummary}>
            <h3>{player.name}</h3>
            <div className={classes.Selections}>
                {playerSummary.map(selection => {
                    round++
                    return (
                        <div key={selection.chartId} className={classes.Summary}>
                            <h4>Round {round}:</h4>
                            <Selection selectionData={selection} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default PlayerSummary;