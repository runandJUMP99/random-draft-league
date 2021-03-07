import React from "react";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CorgiSwim from "../UI/CorgiSwim/CorgiSwim";
import Selections from "../Selections/Selections";

import classes from "./Board.module.css";

const Board = ({handleSelection, selectionContent, selectionSelected}) => {
    return (
        <div className={classes.Board}>
            {selectionSelected && <ArrowBackIcon /> }
            {selectionSelected ? selectionContent : <Selections handleSelection={handleSelection} />}
            {selectionSelected && <CorgiSwim /> }
        </div>
    );
}

export default Board;