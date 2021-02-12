import React, {useState} from "react";

import Register from "./Register/Register";

import classes from "./Start.module.css";

const Start = () => {
    const [start, setStart] = useState(false);

    return (
        <div className={classes.Start}>
            {!start
                ? <>
                    <p>Submit up to 3 entries per week. Make sure to provide a name to be eligible for prizes.</p>
                    <button className={classes.StartButton} onClick={() => setStart(true)}>Start</button>
                </>
                : <Register />}
        </div>
    );
}

export default Start;