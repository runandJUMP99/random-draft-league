import React from "react";

import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';

import classes from "./DarkModeSlider.module.css";

const DarkModeSlider = ({darkMode, setDarkMode}) => {
    return (
        <div className={classes.DarkModeSlider} onClick={() => setDarkMode(prevValue => !prevValue)}>
            <button style={{transform: darkMode && "translate(1.25rem, -0.2rem)"}}>
                {darkMode ? <Brightness2Icon /> : <Brightness5Icon />}
            </button>
        </div>
    );
}

export default DarkModeSlider;