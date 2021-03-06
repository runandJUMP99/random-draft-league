import React, {useState} from "react";
import {useSelector} from "react-redux";

import classes from "./SubmittedSelection.module.css";

const SubmittedSelection = ({count, from, id, isSelected, name, onClick, styles, time}) => {
    const [showTime, setShowTime] = useState(false);
    const isAdmin = useSelector(state => state.auth.userId === process.env.REACT_APP_FIREBASE_UID1 || state.auth.userId === process.env.REACT_APP_FIREBASE_UID2);

    function handleMouseEnter() {
        if (isAdmin) {
            setShowTime(true);
        }
    }
    
    function handleMouseLeave() {
        if (isAdmin) {
            setShowTime(false);    
        }
    }

    function handleClick() {
        if (isAdmin) {
            onClick(id);
        }
    }

    return (
        <div className={classes.SubmittedSelection} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
            ...styles,
            background: count % 2 === 0 ? "lightblue" : "lightgreen",
            boxShadow: isSelected && "0 0 0 0",
            cursor: isSelected && "initial",
            opacity: isSelected && 0.6,
            transform: count % 2 === 0 ? "rotate(2.5deg)" : count % 5 === 0 ? "rotate(1deg)" : "rotate(-1.5deg)"
        }}>
            <p className={classes.From}>{count}. {from}</p>
            <p className={classes.Submission}>{name}</p>
            <p className={classes.Time} style={{opacity: showTime && 1}}>{time}</p>
        </div>
    );
}

export default SubmittedSelection;