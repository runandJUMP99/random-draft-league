import React from "react";

import DeleteIcon from '@material-ui/icons/Delete';

import Button from "../../../UI/Button/Button";
import ConfirmDelete from "../../../UI/ConfirmDelete/ConfirmDelete";

import classes from "./Player.module.css";

const Player = ({player, setModalContent, setShowModal}) => {
    function handleClick() {
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
        <div className={classes.Player}>
            {player.name}
            <Button onClick={handleClick} style={{
                background: "#b9b8b8",
                margin: "0.25rem",
                padding: "0.5rem",
                position: "initial"
            }}>
                <DeleteIcon fontSize="small" />
            </Button>
        </div>
    );
}

export default Player;