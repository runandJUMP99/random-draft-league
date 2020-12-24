import React from "react";
import {useDispatch} from "react-redux";

import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import Button from "../UI/Button/Button";
import ClearBoard from "./ClearBoard/ClearBoard";
import Selections from "../Selections/Selections";

import classes from "./Board.module.css";
import {deleteSelections} from "../../store/actions/selections";

const Board = ({handleSelection, selections, setModalContent, setShowModal}) => {
    const dispatch = useDispatch();

    function handleClick() {
        setModalContent(<ClearBoard onClick={() => dispatch(deleteSelections(selections))} setShowModal={setShowModal} />);
        setShowModal(true);
    }

    return (
        <div className={classes.Board}>
            <Selections handleSelection={handleSelection} />
            <div className={classes.Button}>
                <Button onClick={handleClick} style={{position: "initial"}}><DeleteSweepIcon /></Button>
            </div>
        </div>
    );
}

export default Board;