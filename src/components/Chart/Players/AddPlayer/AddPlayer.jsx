import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, Paper, TextField, Typography} from "@material-ui/core";

import Continue from "../../../UI/Continue/Continue";

import classes from "./AddPlayer.module.css";
import {setRounds} from "../../../../store/actions/chart";
import {addPlayer, editPlayer, setPlayerId} from "../../../../store/actions/players";

const AddPlayer = ({setShowModal}) => {
    const [continueAdding, setContinueAdding] = useState(true);
    const [player, setPlayer] = useState({name: ""});
    const [totalRounds, setTotalRounds] = useState({total: ""});
    const [roundsSet, setRoundsSet] = useState(false);
    const players = useSelector(state => state.players.players);
    const playerId = useSelector(state => state.players.setPlayerId);
    const selectedPlayer = useSelector(state => playerId && state.players.players.find(p => p.playerId === playerId));
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedPlayer) {
            setContinueAdding(true);
            setPlayer(selectedPlayer);
        } else {
            dispatch(setPlayerId(null));
            setPlayer({name: ""});
        }
    }, [dispatch, selectedPlayer]);

    function handleSubmit(event) {
        event.preventDefault();

        if (players.length === 0 && !roundsSet) {
            dispatch(setRounds(totalRounds, token));
            setRoundsSet(true);
        } else {
            if (playerId) {
                dispatch(editPlayer(playerId, player, token));
            } else {
                dispatch(addPlayer(player, token));
            }
        }

        setContinueAdding(false);
        dispatch(setPlayerId(null));
        setPlayer({name: ""});
    }

    return (
        <Paper className={classes.Paper}>
            {players.length === 0 && !roundsSet
                ? <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                    <Typography align="center" variant="h6">How Many Rounds?</Typography>
                    <p>-Leave Blank To Have Unlimited Rounds-</p>
                    <TextField 
                        fullWidth 
                        label="Total Rounds"
                        margin="normal" 
                        name="rounds"
                        onChange={(event) => setTotalRounds({...totalRounds, total: event.target.value})} 
                        required
                        value={totalRounds.total}
                        variant="outlined" 
                    />
                    <Button className={classes.ButtonSubmit} color="primary" fullWidth size="large" type="submit" variant="contained">Submit</Button>
                </form>
                : continueAdding
                ? <form autoComplete="off" className={classes.Form} noValidate onSubmit={handleSubmit}>
                    <Typography align="center" variant="h6">Add Player</Typography>
                    <TextField 
                        fullWidth 
                        label="Name"
                        margin="normal" 
                        name="name"
                        onChange={(event) => setPlayer({...player, name: event.target.value})} 
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