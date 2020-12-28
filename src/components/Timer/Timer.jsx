import React, {useEffect, useState} from "react";

import classes from "./Timer.module.css";

const Timer = () => {
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [startTimer, setStartTimer] = useState(false);

    useEffect(() => {
        let timer;

        if (startTimer) {
            timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    if (minutes === 0) {
                        clearInterval(timer)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    });
    
    return (
        <div className={classes.Timer} onClick={() => setStartTimer(true)}>
            {!startTimer
                ? <h1 className={classes.TimerPaused}>START</h1>
                : <h1 className={classes.Time}>{minutes} : {seconds < 10 ? String(seconds).padStart(2, "0") : seconds}</h1>
            }
        </div>
    );
}

export default Timer;