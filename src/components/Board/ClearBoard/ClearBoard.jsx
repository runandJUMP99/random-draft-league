import React from "react";

import classes from "./ClearBoard.module.css";

const ClearBoard = ({onClick, setShowModal}) => {
    function handleClick() {
        onClick();
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