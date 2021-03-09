import React from "react";

import classes from "./Stat.module.css";

const Stat = ({name, value}) => {
    return (
        <div className={classes.Stat}>
            <p className={classes.Name}>{name}:</p>
            <p className={classes.Value}>{value}</p>
        </div>
    );
}

export default Stat;