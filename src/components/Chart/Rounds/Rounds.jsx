import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Round from "./Round/Round";

import classes from "./Rounds.module.css";
import {getChart} from "../../../store/actions/chart";

const Rounds = ({handleSelection, setModalContent, setShowModal}) => {
    const chart = useSelector(state => state.chart);
    const players = useSelector(state => state.players);
    const dispatch = useDispatch();
    let rounds = [];
    let round = [];
    let roundCount = 1;
    let count = 0;

    useEffect(() => {
        dispatch(getChart());
    }, [dispatch]);

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