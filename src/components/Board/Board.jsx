import React from "react";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CorgiSwim from "../UI/CorgiSwim/CorgiSwim";
import Selections from "../Selections/Selections";

import classes from "./Board.module.css";

const Board = ({handleSelection, selectionContent, selectionSelected, setSelectionSelected}) => {
    const randomNumber = Math.floor(Math.random() *10);

    return (
        <div className={classes.Board}>
            {selectionSelected && <ArrowBackIcon className={classes.ArrowBack} fontSize="large" onClick={() => setSelectionSelected(false)} /> }
            {selectionSelected ? selectionContent : <Selections handleSelection={handleSelection} />}
            {(selectionSelected && randomNumber === 0) && <CorgiSwim /> }
        </div>
    );
}

export default Board;