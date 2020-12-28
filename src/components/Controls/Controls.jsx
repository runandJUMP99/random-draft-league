import React from "react";

import AddIcon from '@material-ui/icons/Add';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TableChartIcon from '@material-ui/icons/TableChart';

import Button from "../UI/Button/Button";

import classes from "./Controls.module.css";

const Controls = ({display, handleDisplay, handleAddSelection, handleAddPlayer}) => {
    return (
        <div className={classes.Controls}>
            {display 
                ? <Button onClick={handleDisplay} style={{right: "5.5rem"}}>
                    <CallToActionIcon fontSize="large" />
                </Button> 
                : <Button onClick={handleDisplay} style={{right: "5.5rem"}}>
                    <TableChartIcon fontSize="large" />
                </Button>
            }
            {display
                ? <Button onClick={() => handleAddSelection(false)} style={{right: "1.5rem"}}>
                    <AddIcon fontSize="large" />
                </Button>
                : <Button onClick={handleAddPlayer} style={{right: "1.5rem"}}>
                    <PersonAddIcon fontSize="large" />
                </Button>
            }
        </div>
    );
}

export default Controls;