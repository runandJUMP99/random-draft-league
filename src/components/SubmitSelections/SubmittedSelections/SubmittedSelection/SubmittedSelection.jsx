import React from "react";

import classes from "./SubmittedSelection.module.css";

const SubmittedSelection = ({count, from, id, isSelected, name, onClick, styles}) => {
    return (
        <div className={classes.SubmittedSelection} onClick={() => onClick(id)} style={{
            ...styles,
            background: count % 2 === 0 ? "lightblue" : "lightgreen",
            boxShadow: isSelected && "0 0 0 0",
            cursor: isSelected && "initial",
            opacity: isSelected && 0.6
        }}>
            {styles
                ? <>
                    <p style={{margin: "1rem auto"}}>{name}</p>
                    <p style={{margin: "2rem auto"}}>Submitted By: {from}</p>
                </>
                : <>
                    <p>{count}. {name.length > 40 ? name.substring(0, 40) + "..." : name}</p>
                    <p>Submitted By: {from && from.length > 30 ? from.substring(0, 30) + "..." : from}</p>
                </>
            }
        </div>
    );
}

export default SubmittedSelection;