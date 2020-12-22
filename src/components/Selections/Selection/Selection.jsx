import React from "react";
import {useDispatch} from "react-redux";

import classes from "./Selection.module.css";
import {deleteSelection} from "../../../store/actions/selections";

const Selection = ({selectionData, showModal, lockInSelection}) => {
    const dispatch = useDispatch();

    return (
        <div className={classes.Selection}>
            <h3>{selectionData.name}</h3>
            <img src={selectionData.img} alt="Selection"/>
            <p>{selectionData.description}</p>
            <div className={classes.Buttons} style={{display: !showModal && "none"}}>
                <div className={classes.EditDeleteButtons}>
                    <button>Edit</button>
                    <button onClick={() => dispatch(deleteSelection(selectionData.id))}>Delete</button>
                </div>
                <button className={classes.LockIn} onClick={() => lockInSelection(selectionData.id)}>LOCK IN</button>
            </div>
        </div>
    );
}

export default Selection;