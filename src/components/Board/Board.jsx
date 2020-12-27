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
            <Button onClick={handleClick} style={{
                bottom: "0.25rem",
                left: "0.25rem",
                padding: "0.5rem",
                position: "absolute"
            }}>
                <DeleteSweepIcon fontSize="small" />
            </Button>
        </div>
    );
}

export default Board;