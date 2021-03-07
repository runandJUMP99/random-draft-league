import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "./ClearBoard.module.css";
import {deleteSelections} from "../../../store/actions/selections";
import {clearNotifications} from "../../../store/actions/notifications";
import {clearPlayers} from "../../../store/actions/players";
import {clearSubmittedSelections, getSubmittedSelections} from "../../../store/actions/submittedSelections";

const ClearBoard = ({setShowModal}) => {
    const selections = useSelector(state => state.selections.selections);
    const players = useSelector(state => state.players.players);
    const submittedSelections = useSelector(state => state.submittedSelections);
    const token = useSelector(state => state.auth.token);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubmittedSelections());
    }, [dispatch]);

    function handleClick() {
        dispatch(deleteSelections(selections, token, users));
        dispatch(clearPlayers(players, token));
        dispatch(clearSubmittedSelections(submittedSelections, token));
        dispatch(clearNotifications(token));
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