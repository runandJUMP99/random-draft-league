import React, {useState} from "react";

import classes from "./Timer.module.css";

const Timer = () => {
    const [timer, setTimer] = useState(120);
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [startTimer, setStartTimer] = useState(false);
    let minuteTime;
    let secondTime

    function handleClick() {
        setStartTimer(true);

        setTimeout(() => {
            setMinutes(prevMinutes => prevMinutes - 1);
        }, 1000);

        minuteTime = setInterval(() => {
            setMinutes(prevMinutes => prevMinutes - 1);
        }, 60000);

        secondTime = setInterval(() => {
            if (seconds === 0) {
                setSeconds(59);
            } else {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
        }, 1000);
    }
    console.log(minutes, seconds); 
    if (minutes === 0) {
        console.log("minutes if");
        clearInterval(minuteTime);
    }
    if (seconds === 0) {
        console.log("seconds if");
        clearInterval(secondTime);
    }

    return (
        <div className={classes.Timer} onClick={handleClick}>
            {!startTimer
                ? <h1 className={classes.TimerPaused}>START</h1>
                : <h1 className={classes.Time}>{minutes} : {seconds < 10 ? String(seconds).padStart(2, "0") : seconds}</h1>
            }
        </div>
    );
}

export default Timer;