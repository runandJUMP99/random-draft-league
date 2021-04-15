import React from "react";

import classes from "./MenuItem.module.css";

const MenuItem = ({name, selected, setCurrentDisplay}) => {
    return (
        <li className={classes.MenuItem} onClick={setCurrentDisplay} style={{fontWeight: selected && "bold"}}>
            {name}
        </li>
    );
}

export default MenuItem;