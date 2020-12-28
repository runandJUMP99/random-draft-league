import React from "react";
import {useSelector} from "react-redux";

import Selection from "../../../../Selections/Selection/Selection";

import classes from "./PlayerSummary.module.css";

const PlayerSummary = ({player}) => {
    const chart = useSelector(state => state.chart);
    const playerSummary = chart.filter(selection => selection.player === player.playerId);

    return (
        <div className={classes.PlayerSummary}>
            <h3>{player.name}</h3>
            <div className={classes.Selections}>
                {playerSummary.map(selection => (
                    <Selection key={selection.chartId} selectionData={selection} />
                ))}
            </div>
        </div>
    );
}

export default PlayerSummary;