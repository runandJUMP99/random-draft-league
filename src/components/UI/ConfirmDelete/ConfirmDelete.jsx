import React from "react";
import {useDispatch} from "react-redux";

import classes from "./ConfirmDelete.module.css";
import {removePlayer} from "../../../store/actions/players";

const ConfirmDelete = ({item, playerId, setShowModal}) => {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(removePlayer(playerId));
        setShowModal(false);
    }

    return (
        <div className={classes.ConfirmDelete}>
            <h2>Are you sure you want to delete this {item}?</h2>
            <button className={classes.Confirm} onClick={handleClick}>Get em Outta Here!</button>
            <button className={classes.Cancel} onClick={() => setShowModal(false)}>Wait...</button>
        </div>
    );
}

export default ConfirmDelete;