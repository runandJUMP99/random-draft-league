import React from "react";

import classes from "./Over18Message.module.css";

const Over18Message = ({setOver18, setOver18Clicked}) => {
    function handleClick(over18) {
        setOver18Clicked(true)

        if (over18) {
            setOver18(true);
        }
    }

    return (
        <div className={classes.Over18Message}>
            <h1>By continuing you are agreeing that you are at least 18 years of age</h1>
            <div className={classes.Buttons}>
                <button className={classes.Agree} onClick={() => handleClick(true)}>I'm Old Enough!</button>
                <button className={classes.Disagree} onClick={() => handleClick(false)}>Get Me Out!</button>
            </div>
        </div>
    );
}

export default Over18Message;