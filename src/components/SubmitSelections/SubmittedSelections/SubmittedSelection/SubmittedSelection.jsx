import React from "react";
import {useSelector} from "react-redux";

import classes from "./SubmittedSelection.module.css";

const SubmittedSelection = ({count, from, id, isSelected, name, onClick, styles}) => {
    const isAdmin = useSelector(state => state.auth.userId === process.env.REACT_APP_FIREBASE_UID1 || state.auth.userId === process.env.REACT_APP_FIREBASE_UID2);

    function handleClick() {
        if (isAdmin) {
            onClick(id);
        }
    }

    return (
        <div className={classes.SubmittedSelection} onClick={handleClick} style={{
            ...styles,
            background: count % 2 === 0 ? "lightblue" : "lightgreen",
            boxShadow: isSelected && "0 0 0 0",
            cursor: isSelected && "initial",
            opacity: isSelected && 0.6,
            transform: count % 2 === 0 ? "rotate(2.5deg)" : count % 5 === 0 ? "rotate(1deg)" : "rotate(-1.5deg)"
        }}>
<<<<<<< HEAD
            {styles
                ? <>
                    <p style={{margin: "1rem auto"}}>{name}</p>
                    <p style={{margin: "2rem auto"}}>Submitted By: {from}</p>
                </>
                : <>
                    <p>{count}. {name && name.length > 40 ? name.substring(0, 40) + "..." : name}</p>
                    <p>Submitted By: {from && from.length > 30 ? from.substring(0, 30) + "..." : from}</p>
                </>
            }
=======
            <p className={classes.From}>{count}. {from}</p>
            <p className={classes.Submission}>{name}</p>
>>>>>>> 051b96770fe30234d46f3206669c545318649b39
        </div>
    );
}

export default SubmittedSelection;