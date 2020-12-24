import React from "react";
import {useDispatch} from "react-redux";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Button from "../../UI/Button/Button";

import classes from "./Selection.module.css";
import {deleteSelection} from "../../../store/actions/selections";

const Selection = ({selectionData, showModal, lockInSelection}) => {
    const dispatch = useDispatch();
    const description = selectionData.description || "";
    console.log()
    const truncatedDescription = description.length > 8 ? description.substring(0, 8) + "..." : description;

    return (
        <div className={classes.Selection} style={{
            cursor: showModal && "initial",
            height: showModal && "100%",
            width: showModal && "100%"
        }}>
            <h3>{selectionData.name}</h3>
            <img src={selectionData.img} alt="Selection"/>
            <p>{showModal ? description : truncatedDescription}</p>
            <div className={classes.Buttons} style={{display: !showModal && "none"}}>
                <button className={classes.LockIn} onClick={() => lockInSelection(selectionData.id)}>LOCK IN</button>
                <div className={classes.EditDeleteButtons}>
                    <Button style={{
                        background: "#3f3f3f",
                        margin: "0.25rem",
                        padding: "0.5rem",
                        position: "initial"
                    }}>
                        <EditIcon fontSize="small" />
                    </Button>
                    <Button onClick={() => dispatch(deleteSelection(selectionData.id))} style={{
                        background: "#3f3f3f",
                        margin: "0.25rem",
                        padding: "0.5rem",
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