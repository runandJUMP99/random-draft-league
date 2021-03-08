import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, Paper, TextField, Typography} from "@material-ui/core";
import FileBase from "react-file-base64";

import classes from "./AddSelection.module.css";
import {addSelection, editSelection, setSelectionId} from "../../store/actions/selections";
import {deleteSubmittedSelection, editSubmittedSelection} from "../../store/actions/submittedSelections";

const AddSelection = ({submittedSelection, setShowModal}) => {
    const [selectionData, setSelectionData] = useState({
        name: "",
        description: "",
        img: "",
        userId: "",
    });
    const selectionId = useSelector(state => state.selections.setSelectionId);
    const selection = useSelector(state => selectionId && state.selections.selections.find(s => s.id === selectionId));
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selection) {
            setSelectionData(selection);
        } else if (submittedSelection) {
            setSelectionData({
                name: submittedSelection.name,
                description: "",
                img: "",
                userId: submittedSelection.userId
            })
        } else {
            setSelectionData({
                name: "",
                description: "",
                img: ""
            });
        }
    }, [selection, submittedSelection]);
    
    function handleSubmit(event) {
        event.preventDefault();

        if (selectionId) {
            dispatch(editSelection(selectionId, selectionData, token));
        } else {
            if (submittedSelection) {
                const newSelection = {
                    ...submittedSelection,
                    isSelected: true
                };

                dispatch(editSubmittedSelection(newSelection.id, newSelection, token));
            }

            dispatch(addSelection(selectionData, token));
        }

        clear();
        setShowModal(false);
    }

    function handleDelete() {
        dispatch(deleteSubmittedSelection(submittedSelection.id, token));
        setShowModal(false);
    }

    function clear() {
        dispatch(setSelectionId(null));
        setSelectionData({
            name: "",
            description: "",
            img: ""
        });
    }

    return (
        <Paper className={classes.Paper}>
            <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                <Typography align="center" variant="h6">Add Entry</Typography>
                <TextField 
                    fullWidth 
                    label="Name"
                    margin="normal" 
                    name="name"
                    onChange={(event) => setSelectionData({...selectionData, name: event.target.value})} 
                    required
                    value={selectionData.name}
                    variant="outlined" 
                />
                <TextField 
                    fullWidth 
                    label="Description" 
                    margin="normal"
                    name="description"
                    onChange={(event) => setSelectionData({...selectionData, description: event.target.value})} 
                    required
                    value={selectionData.description}
                    variant="outlined" 
                />
                <div className={classes.FileInput}>
                    <FileBase 
                        multiple={false} 
                        onDone={({base64}) => setSelectionData({...selectionData, img: base64})} 
                        type="file"
                    />
                </div>
                <Button className={classes.ButtonSubmit} color="primary" fullWidth size="large" type="submit" variant="contained">Submit</Button>
                <Button color="secondary" fullWidth onClick={clear} size="small" variant="contained">Clear</Button>
                <Button fullWidth onClick={handleDelete} size="small" variant="contained" style={{display: !submittedSelection && "none", marginTop: "0.3rem !important"}}>Delete</Button>
            </form>
        </Paper>
    );
}

export default AddSelection;