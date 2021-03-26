import React from "react";
import {useSelector} from "react-redux";

import Round from "./Round/Round";

import classes from "./Rounds.module.css";

const Rounds = ({chart, handleSelection, setModalContent, setShowModal}) => {
    const customPlayers = useSelector(state => state.players.players); //players added by the admin
    const userPlayers = useSelector(state => state.users).filter(user => user.isFranchise); //players with accounts sorted by their order number
    const players = userPlayers.concat(customPlayers);
    let rounds = [];
    let round = [];
    let roundCount = 1;
    let count = 0;
    chart.sort((a, b) => a.order - b.order); //put selections in the order that they were selected
    
    chart.forEach(selection => { //sets up rounds for "snake" selection style
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

    if (round.length > 0) { //used if draft is refreshed and roundCount or round hs not been pushed to appropriate arrays
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