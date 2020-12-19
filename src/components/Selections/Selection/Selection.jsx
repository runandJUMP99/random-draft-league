import React from "react";

import classes from "./Selection.module.css";

const Selection = ({selectionData, setSelectionId}) => {
    return (
        <div className={classes.Selection}>
            <h6>{selectionData.name}</h6>
            <p>{selectionData.description}</p>
            <img src={selectionData.img} alt="Selection"/>
            <button onClick={() => setSelectionId(selectionData.id)}>Edit</button>
        </div>
    );
}

export default Selection;