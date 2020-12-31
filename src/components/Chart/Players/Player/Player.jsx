import React from "react";
import {useDispatch, useSelector} from "react-redux";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import AddPlayer from "../AddPlayer/AddPlayer";
import Button from "../../../UI/Button/Button";
import ConfirmDelete from "../../../UI/ConfirmDelete/ConfirmDelete";
import PlayerSummary from "./PlayerSummary/PlayerSummary";

import classes from "./Player.module.css";
import {setPlayerId} from "../../../../store/actions/players";

const Player = ({player, setModalContent, setShowModal}) => {
    const chart = useSelector(state => state.chart);
    const dispatch = useDispatch();

    function handleClick() {
        setModalContent(<PlayerSummary player={player} />);
        setShowModal(true);
    }

    function handleEdit() {
        dispatch(setPlayerId(player.playerId));
        setModalContent(<AddPlayer setShowModal={setShowModal} />);
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
            <div style={{display: chart.length > 0 && "none"}}>
                <Button onClick={handleEdit} style={{
                    background: "#b9b8b8",
                    margin: "0.25rem",
                    padding: "0.3rem 0.25rem 0.2rem",
                    right: "2rem"
                }}>
                    <EditIcon fontSize="small" />
                </Button>
                <Button onClick={handleDelete} style={{
                    background: "#b9b8b8",
                    margin: "0.25rem",
                    padding: "0.3rem 0.25rem 0.2rem",
                    right: 0
                }}>
                    <DeleteIcon fontSize="small" />
                </Button>
            </div>
        </div>
    );
}

export default Player;