import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';

import Button from "../../UI/Button/Button";

import classes from "./Selection.module.css";
import {getRounds} from "../../../store/actions/chart";
import {deleteSelection} from "../../../store/actions/selections";
import logo from "../../../assets/images/logo.png";

const Selection = ({selectionData, selectionSelected, lockInSelection, handleAddSelection, setShowModal}) => {
    const chart = useSelector(state => state.selections.selections.filter(selection => selection.player));
    const players = useSelector(state => state.players.players);
    const totalRounds = useSelector(state => state.chart.rounds);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const description = selectionData.description || "";
    const name = selectionData.name || "";
    const totalSelections = players.length * totalRounds;
    const truncatedName = name.length > 12 ? name.substring(0, 12) + "..." : name;
    const selectedStyles = {
        background: selectionData.isSelected && "#000120",
        boxShadow: selectionData.isSelected && "0 0 0 0",
        cursor: selectionSelected && "initial",
        height: selectionSelected && "80%",
        margin: selectionSelected && "0 auto",
        padding: !selectionSelected && "0.5rem",
        width: selectionSelected && "80%"
    };

    useEffect(() => {
        dispatch(getRounds(token));
    }, [dispatch, token]);

    function handleDelete() {
        dispatch(deleteSelection(selectionData.id, token));
        setShowModal(false);
    }

    return (
        <div className={classes.Selection} style={selectedStyles}>
            <img src={selectionData.img ? selectionData.img : logo} alt="Selection" style={{height: selectionSelected && "20rem", width: selectionSelected && "20rem"}} />
            <div className={classes.ImgShadow} style={{display: selectionSelected && "none"}}></div>
            <h4 style={{fontSize: selectionSelected ? "2rem" : "1.5rem"}}>{selectionSelected ? name : truncatedName}</h4>
            <p style={{padding: selectionSelected && "0 1rem"}}>{selectionSelected && description}</p>
            <div className={classes.Buttons} style={{display: !selectionSelected && "none"}}>
                <button className={classes.LockIn} disabled={players.length === 0 || (totalSelections !== 0 && chart.length >= totalSelections)} onClick={() => lockInSelection(selectionData.id)} style={{
                    display: selectionData.isSelected && "none"
                }}>
                    {players.length === 0 ? "PLEASE ADD PLAYERS" : "LOCK IN"}
                </button>
                <div className={classes.EditDeleteButtons}>
                    <Button onClick={() => lockInSelection(selectionData.id, true)} style={{
                        background: "#01023a",
                        display: selectionData.isSelected && "none",
                        margin: "0.25rem",
                        padding: "0.25rem",
                        position: "initial"
                    }}>
                        <StarIcon fontSize="small" />
                    </Button>
                    <Button onClick={() => handleAddSelection(true)} style={{
                        background: "#01023a",
                        margin: "0.25rem",
                        padding: "0.25rem",
                        position: "initial"
                    }}>
                        <EditIcon fontSize="small" />
                    </Button>
                    <Button onClick={handleDelete} style={{
                        background: "#01023a",
                        display: selectionData.isSelected && "none",
                        margin: "0.25rem",
                        padding: "0.25rem",
                        position: "initial"
                    }}>
                        <DeleteIcon fontSize="small" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Selection;