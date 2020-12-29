import React from "react";

import Selections from "../Selections/Selections";

import classes from "./Board.module.css";

const Board = ({handleSelection}) => {
    return (
        <div className={classes.Board}>
            <Selections handleSelection={handleSelection} />
        </div>
    );
}

export default Board;