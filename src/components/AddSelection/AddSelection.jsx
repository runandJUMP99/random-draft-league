import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, Paper, TextField, Typography} from "@material-ui/core";
import FileBase from "react-file-base64";

import Continue from "../UI/Continue/Continue";

import classes from "./AddSelection.module.css";
import {addSelection, editSelection, setSelectionId} from "../../store/actions/selections";

const AddSelection = ({setShowModal}) => {
    const [continueAdding, setContinueAdding] = useState(true);
    const [selectionData, setSelectionData] = useState({
        name: "",
        description: "",
        img: ""
    });
    const selectionId = useSelector(state => state.selections.setSelectionId);
    const selection = useSelector(state => selectionId && state.selections.selections.find(s => s.id === selectionId));
    const dispatch = useDispatch();

    useEffect(() => {
        if (selection) {
            setSelectionData(selection);
        } else {
            clear();
        }
    }, [selection]);
    
    function handleSubmit(event) {
        event.preventDefault();

        if (selectionId) {
            dispatch(editSelection(selectionId, selectionData));
        } else {
            dispatch(addSelection(selectionData));
        }

        setContinueAdding(false);
        clear();
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
            {continueAdding
                ? <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
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
                </form>
                : <Continue setContinueAdding={setContinueAdding} setShowModal={setShowModal} heading="Entires" />}
        </Paper>
    );
}

export default AddSelection;