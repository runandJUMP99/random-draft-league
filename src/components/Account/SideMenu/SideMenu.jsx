import React from "react";

import MenuItem from "./MenuItem/MenuItem";

import classes from "./SideMenu.module.css";

const SideMenu = ({currentDisplay, setCurrentDisplay}) => {
    return (
        <ul className={classes.SideMenu}>
            <MenuItem setCurrentDisplay={() => setCurrentDisplay(0)} name="Notifications" selected={currentDisplay === 0} />
            <MenuItem setCurrentDisplay={() => setCurrentDisplay(1)} name="Submissions" selected={currentDisplay === 1} />
            <MenuItem setCurrentDisplay={() => setCurrentDisplay(2)} name="Profile" selected={currentDisplay === 2} />
        </ul>
    );
}

export default SideMenu;