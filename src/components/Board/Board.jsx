import React from "react";
import {useDispatch} from "react-redux";

import Selections from "../Selections/Selections";

import classes from "./Board.module.css";
import {deleteSelections} from "../../store/actions/selections";

const Board = ({handleSelection, selections}) => {
    const dispatch = useDispatch();

    return (
        <div className={classes.Board}>
            <Selections handleSelection={handleSelection} />
            <div className={classes.Buttons}>
                <button onClick={() => dispatch(deleteSelections(selections))}>Clear Board</button>
            </div>
        </div>
    );
}

export default Board;