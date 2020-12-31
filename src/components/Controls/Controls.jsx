import React from "react";

import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AddIcon from '@material-ui/icons/Add';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TableChartIcon from '@material-ui/icons/TableChart';

import Button from "../UI/Button/Button";
import ClearBoard from "../Board/ClearBoard/ClearBoard";

import classes from "./Controls.module.css";

const Controls = ({display, handleDisplay, handleAddSelection, handleAddPlayer, setModalContent, setShowModal}) => {
    function handleClick() {
        setModalContent(<ClearBoard setShowModal={setShowModal} />);
        setShowModal(true);
    }
    
    return (
        <div className={classes.Controls}>
            <Button onClick={handleClick} style={{
                bottom: "0.25rem",
                left: "0.25rem",
                padding: "0.5rem",
                position: "absolute"
            }}>
                <DeleteSweepIcon fontSize="small" />
            </Button>
            {display 
                ? <Button onClick={handleDisplay} style={{right: "5.5rem"}}>
                    <CallToActionIcon />
                </Button> 
                : <Button onClick={handleDisplay} style={{right: "5.5rem"}}>
                    <TableChartIcon />
                </Button>
            }
            {display
                ? <Button onClick={() => handleAddSelection(false)} style={{right: "1.5rem"}}>
                    <AddIcon />
                </Button>
                : <Button onClick={() => handleAddPlayer(false)} style={{right: "1.5rem"}}>
                    <PersonAddIcon />
                </Button>
            }
        </div>
    );
}

export default Controls;