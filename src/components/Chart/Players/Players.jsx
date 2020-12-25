import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import AddPlayer from "./AddPlayer/AddPlayer";
import Player from "./Player/Player";

import classes from "./Players.module.css";
import {getPlayers} from "../../../store/actions/players";

const Players = ({setModalContent, setShowModal}) => {
    const players = useSelector(state => state.players);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPlayers());
    }, [dispatch]);
    
    function handleAddPlayer() {
        setModalContent(<AddPlayer setShowModal={setShowModal} />);
        setShowModal(true);
    }

    return (
        <div className={classes.Players}>
            <h2>Players</h2>
            {players.map(player => (
                <Player 
                    key={player.playerId} 
                    player={player} 
                    setModalContent={setModalContent} 
                    setShowModal={setShowModal} 
                />
            ))}
            <button onClick={handleAddPlayer}>Add Player</button>
        </div>
    );
}

export default Players;