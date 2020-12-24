import React from "react";

import classes from "./Continue.module.css";

const Continue = ({setContinueAdding, setShowModal, heading}) => {
    function handleClick() {
        setShowModal(false);
        
        setTimeout(() => {
            setContinueAdding(true);
        }, 1000);
    }

    return (
        <div className={classes.Continue}>
            <h2>Continue Adding {heading}?</h2>
            <button className={classes.Confirm} onClick={() => setContinueAdding(true)}>Continue!</button>
            <button className={classes.Cancel} onClick={handleClick}>Nah, we good.</button>
        </div>
    );
}

export default Continue;