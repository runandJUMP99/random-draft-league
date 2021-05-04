import React from "react";
import {useDispatch, useSelector} from "react-redux";

import DeleteIcon from '@material-ui/icons/Delete';

import Button from "../../../UI/Button/Button";

import classes from "./Submission.module.css";
import {deleteSelection} from "../../../../store/actions/selections";
import {deleteSubmittedSelection} from "../../../../store/actions/submittedSelections";

const Submission = ({draftId, id, isSelected, name}) => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(deleteSubmittedSelection(id, token));

        if (isSelected) {
            dispatch(deleteSelection(draftId, token));
        }
    }
    
    return (
        <div className={classes.Submission}>
            {name}
            {id && <Button onClick={handleDelete} style={{
                background: "#b9b8b8",
                bottom: 0,
                margin: "0.25rem",
                padding: "0.15rem",
                right: "0.25rem"
            }}>
                <DeleteIcon fontSize="small" />
            </Button>}
        </div>
    );
}

export default Submission;