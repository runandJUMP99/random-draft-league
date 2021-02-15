import React from "react";

import MenuItem from "./MenuItem/MenuItem";

import classes from "./SideMenu.module.css";

const SideMenu = ({setCurrentDisplay}) => {
    return (
        <ul className={classes.SideMenu}>
            <MenuItem setCurrentDisplay={() => setCurrentDisplay(0)} name="Notifications" />
            <MenuItem setCurrentDisplay={() => setCurrentDisplay(1)} name="Profile" />
        </ul>
    );
}

export default SideMenu;