import React from "react";
import {useSelector} from "react-redux";

import Selection from "../../../../Selections/Selection/Selection";

import classes from "./RoundSummary.module.css";
import logo from "../../../../../assets/images/logo.png";

const RoundSummary = ({round, selections}) => {
    const customPlayers = useSelector(state => state.players.players); //players added by the admin
    const userPlayers = useSelector(state => state.users).filter(user => user.isFranchise).sort((a, b) => a.order - b.order); //players with accounts sorted by their order number
    const players = userPlayers.concat(customPlayers);
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
                            <div key={selection.id} className={classes.Summary}>
                                <div className={classes.NameGroup}>
                                    <img src={players[count].img ? players[count].img : logo} alt={players[count].name}/>
                                    <h4>{players[count].name.substring(0, 8)}:</h4>
                                </div>
                                <Selection selectionData={selection} />
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}

export default RoundSummary;