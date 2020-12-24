import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {Button, Paper, TextField, Typography} from "@material-ui/core";

import Continue from "../../../UI/Continue/Continue";

import classes from "./AddPlayer.module.css";
import {addPlayer} from "../../../../store/actions/players";

const AddPlayer = ({setShowModal}) => {
    const [continueAdding, setContinueAdding] = useState(true);
    const [player, setPlayer] = useState({name: ""});
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(addPlayer(player));

        setContinueAdding(false);
        setPlayer({name: ""});
    }

    return (
        <Paper className={classes.Paper}>
            {continueAdding
                ? <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                    <Typography align="center" variant="h6">Add Player</Typography>
                    <TextField 
                        fullWidth 
                        label="Name"
                        margin="normal" 
                        name="name"
                        onChange={(event) => setPlayer({name: event.target.value})} 
                        required
                        value={player.name}
                        variant="outlined" 
                    />
                    <Button className={classes.ButtonSubmit} color="primary" fullWidth size="large" type="submit" variant="contained">Submit</Button>
                </form>
                : <Continue setContinueAdding={setContinueAdding} setShowModal={setShowModal} heading="Players" />}
        </Paper>
    );
}

export default AddPlayer;