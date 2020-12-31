import React from "react";

import classes from "./SubmittedSelection.module.css";

const SubmittedSelection = ({count, from, name}) => {
    return (
        <div className={classes.SubmittedSelection} style={{
            background: count % 2 === 0 ? "lightblue" : "lightgreen"
        }}>
            <p>{count}. {name.length > 40 ? name.substring(0, 40) + "..." : name}</p>
            <p>From: {from.length > 30 ? from.substring(0, 30) + "..." : from}</p>
        </div>
    );
}

export default SubmittedSelection;