import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Player from "./Player/Player";

import classes from "./Players.module.css";
import {getPlayers} from "../../../store/actions/players";

const Players = ({setModalContent, setShowModal}) => {
    const players = useSelector(state => state.players.players);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPlayers());
    }, [dispatch]);

    return (
        <div className={classes.Players}>
            <h2>Drafters</h2>
            {players.map(player => (
                <Player 
                    key={player.playerId} 
                    player={player} 
                    setModalContent={setModalContent} 
                    setShowModal={setShowModal} 
                />
            ))}
        </div>
    );
}

export default Players;