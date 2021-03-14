import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Player from "./Player/Player";

import classes from "./Players.module.css";
import {getPlayers} from "../../../store/actions/players";

const Players = ({setModalContent, setShowModal}) => {
    const customPlayers = useSelector(state => state.players.players); //players added by the admin
    const userPlayers = useSelector(state => state.users).filter(user => user.isFranchise).sort((a, b) => a.order - b.order); //players with accounts sorted by their order number
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const players = userPlayers.concat(customPlayers);

    useEffect(() => {
        dispatch(getPlayers(token));
    }, [dispatch, token]);

    return (
        <div className={classes.Players}>
            <h2>Drafters</h2>
            {players.map(player => (
                <Player 
                    key={player.playerId ? player.playerId : player.name} 
                    player={player} 
                    setModalContent={setModalContent} 
                    setShowModal={setShowModal} 
                />
            ))}
        </div>
    );
}

export default Players;