import React from "react";
import {useDispatch, useSelector} from "react-redux";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Button from "../../UI/Button/Button";

import classes from "./Selection.module.css";
import {deleteSelection} from "../../../store/actions/selections";
import {removeFromChart} from "../../../store/actions/chart";
import logo from "../../../assets/images/logo.png";

const Selection = ({selectionData, showModal, lockInSelection, handleAddSelection, setShowModal}) => {
    const players = useSelector(state => state.players.players);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const name = selectionData.name || "";
    const truncatedName = name.length > 12 ? name.substring(0, 12) + "..." : name;
    const description = selectionData.description || "";
    const truncatedDescription = description.length > 8 ? description.substring(0, 8) + "..." : description;
    const selectedStyles = {
        background: selectionData.isSelected && "#000120",
        boxShadow: selectionData.isSelected && "0 0 0 0",
        cursor: showModal && "initial",
        height: showModal && "100%",
        margin: showModal && 0,
        width: showModal && "100%"
    };

    function handleDelete() {
        dispatch(deleteSelection(selectionData.id, token));
        
        if (selectionData.isSelected) {
            dispatch(removeFromChart(selectionData.chartId, token));
        }

        setShowModal(false);
    }

    return (
        <div className={classes.Selection} style={selectedStyles}>
            <h3 style={{fontSize: showModal ? "2rem" : "1.5rem"}}>{showModal ? name : truncatedName}</h3>
            <img src={selectionData.img ? selectionData.img : logo} alt="Selection"/>
            <p style={{padding: showModal && "0 1rem"}}>{showModal ? description : truncatedDescription}</p>
            <div className={classes.Buttons} style={{display: !showModal && "none"}}>
                <button className={classes.LockIn} disabled={players.length === 0} onClick={() => lockInSelection(selectionData.id)} style={{
                    display: selectionData.isSelected && "none"
                }}>
                    {players.length === 0 ? "PLEASE ADD PLAYERS" : "LOCK IN"}
                </button>
                <div className={classes.EditDeleteButtons}>
                    <div className={classes.EditButton}>
                        <Button style={{
                            background: "#01023a",
                            margin: "0.25rem",
                            padding: "0.25rem"
                        }}>
                            <EditIcon onClick={() => handleAddSelection(true)} fontSize="small" />
                        </Button>
                    </div>
                    <Button onClick={handleDelete} style={{
                        background: "#01023a",
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