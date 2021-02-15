import React from "react";

import classes from "./MenuItem.module.css";

const MenuItem = ({name, setCurrentDisplay}) => {
    return (
        <li className={classes.MenuItem} onClick={setCurrentDisplay}>
            {name}
        </li>
    );
}

export default MenuItem;