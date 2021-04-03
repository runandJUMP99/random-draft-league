import React from "react";
import {useSelector} from "react-redux";

import Selection from "../../../../Selections/Selection/Selection";

import classes from "./PlayerSummary.module.css";
import logo from "../../../../../assets/images/logo.png";

const PlayerSummary = ({player}) => {
    const chart = useSelector(state => state.selections.selections).filter(selection => selection.player);
    const playerSummary = chart.filter(selection => selection.player === player.userId);
    let round = 0;

    playerSummary.sort((a, b) => a.order - b.order);

    return (
        <div className={classes.PlayerSummary}>
            <img className={classes.ProfilePicture} src={player.img ? player.img : logo} alt="Player Logo"/>
            <h3>{player.name}</h3>
            <div className={classes.Selections}>
                {playerSummary.map(selection => {
                    round++
                    return (
                        <div key={selection.id} className={classes.Summary}>
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