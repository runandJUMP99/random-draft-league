import React from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "./ClearBoard.module.css";
import {deleteSelections} from "../../../store/actions/selections";
import {clearChart} from "../../../store/actions/chart";
import {clearPlayers} from "../../../store/actions/players";

const ClearBoard = ({setShowModal}) => {
    const selections = useSelector(state => state.selections.selections);
    const chartSelections = useSelector(state => state.chart);
    const players = useSelector(state => state.players);
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(deleteSelections(selections));
        dispatch(clearChart(chartSelections));
        dispatch(clearPlayers(players));
        setShowModal(false);
    }

    return (
        <div className={classes.ClearBoard}>
            <div className={classes.Text}>
                <h1>Are you sure you want to clear the board?</h1>
                <button className={classes.Confirm} onClick={handleClick}>Hell Yaw!</button>
                <button className={classes.Cancel} onClick={() => setShowModal(false)}>Hell Naw!</button>
            </div>
        </div>
    );
}

export default ClearBoard;