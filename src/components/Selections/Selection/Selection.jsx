import React from "react";
import {useSelector} from "react-redux";

import classes from "./Selection.module.css";

const Selection = ({selectionData}) => {
    console.log(selectionData);
    return (
        <div className={classes.Selection}>
            <h6>{selectionData.name}</h6>
            <p>{selectionData.description}</p>
            <img src={selectionData.img} alt="Selection"/>
        </div>
    );
}

export default Selection;