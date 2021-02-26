import React from "react";
import {useSelector} from "react-redux";

import Round from "./Round/Round";

import classes from "./Rounds.module.css";

const Rounds = ({handleSelection, setModalContent, setShowModal}) => {
    const chart = useSelector(state => state.selections.selections.filter(selection => selection.player));
    const players = useSelector(state => state.players.players);
    let rounds = [];
    let round = [];
    let roundCount = 1;
    let count = 0;

    chart.sort((a, b) => a.order - b.order);

    chart.forEach(selection => {
        round.push(selection);
        count++;

        if (count === players.length) {
            round.push(roundCount);
            rounds.push(round);
            round = [];
            roundCount++;
            count = 0;
        }
    });

    if (round.length > 0) {
        round.push(roundCount);
        rounds.push(round);
    }

    return (
        <div className={classes.Rounds}>
            {rounds.map((round, index) => (
                <Round 
                    key={index} 
                    handleSelection={handleSelection}
                    round={round[round.length - 1]} 
                    selections={round} 
                    setModalContent={setModalContent}
                    setShowModal={setShowModal}
                />
            ))}
        </div>
    );
}

export default Rounds;