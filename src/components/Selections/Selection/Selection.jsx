import React from "react";
import {useDispatch} from "react-redux";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Button from "../../UI/Button/Button";

import classes from "./Selection.module.css";
import {deleteSelection} from "../../../store/actions/selections";
import {removeFromChart} from "../../../store/actions/chart";

const Selection = ({selectionData, showModal, lockInSelection, handleAddSelection, setShowModal}) => {
    const dispatch = useDispatch();
    const name = selectionData.name || "";
    const truncatedName = name.length > 15 ? name.substring(0, 15) + "..." : name;
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
        dispatch(deleteSelection(selectionData.id));
        
        if (selectionData.isSelected) {
            dispatch(removeFromChart(selectionData.chartId));
        }

        setShowModal(false);
    }

    return (
        <div className={classes.Selection} style={selectedStyles}>
            <h3>{showModal ? name : truncatedName}</h3>
            <img src={selectionData.img} alt="Selection"/>
            <p style={{padding: showModal && "0 1rem"}}>{showModal ? description : truncatedDescription}</p>
            <div className={classes.Buttons} style={{display: !showModal && "none"}}>
                <button className={classes.LockIn} onClick={() => lockInSelection(selectionData.id)} style={{
                    display: selectionData.isSelected && "none"
                }}>
                    LOCK IN
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