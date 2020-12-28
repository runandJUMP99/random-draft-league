import React from "react";

import DeleteIcon from '@material-ui/icons/Delete';

import Button from "../../../UI/Button/Button";
import ConfirmDelete from "../../../UI/ConfirmDelete/ConfirmDelete";
import PlayerSummary from "./PlayerSummary/PlayerSummary";

import classes from "./Player.module.css";

const Player = ({player, setModalContent, setShowModal}) => {
    function handleClick() {
        setModalContent(<PlayerSummary player={player} />);
        setShowModal(true);
    }

    function handleDelete() {
        setModalContent(
            <ConfirmDelete 
                item="player" 
                playerId={player.playerId} 
                setShowModal={setShowModal}
            />
        );
        setShowModal(true);        
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Player} onClick={handleClick}>
                <h4>{player.name}</h4>
            </div>
            <Button onClick={handleDelete} style={{
                background: "#b9b8b8",
                margin: "0.25rem",
                padding: "0.3rem 0.25rem 0.2rem",
                position: "absolute",
                right: 0
            }}>
                <DeleteIcon fontSize="small" />
            </Button>
        </div>
    );
}

export default Player;