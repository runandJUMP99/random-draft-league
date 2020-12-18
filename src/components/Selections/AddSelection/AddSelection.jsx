import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {Button, Paper, TextField, Typography} from "@material-ui/core";
import FileBase from "react-file-base64";

import classes from "./AddSelection.module.css";
import {addSelection} from "../../../store/actions/selections";

const AddSelection = () => {
    const [selectionData, setSelectionData] = useState({
        name: "",
        description: "",
        img: ""
    });
    const dispatch = useDispatch();
    
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(addSelection(selectionData));
        clear();
    }

    function clear() {
        setSelectionData({
            name: "",
            description: "",
            img: ""
        });
    }

    return (
        <Paper className={classes.Paper}>
            <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">Heading</Typography>
                <TextField 
                    fullWidth 
                    label="Name" 
                    name="name"
                    onChange={(event) => setSelectionData({...selectionData, name: event.target.value})} 
                    value={selectionData.name}
                    variant="outlined" 
                />
                <TextField 
                    fullWidth 
                    label="Description" 
                    name="description"
                    onChange={(event) => setSelectionData({...selectionData, description: event.target.value})} 
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
        </Paper>
    );
}

export default AddSelection;