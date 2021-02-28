import React from "react";

import RoomServiceIcon from '@material-ui/icons/RoomService';

import classes from "./Timer.module.css";
import nflChime from "../../assets/audio/nflChime.mp3";

const Timer = () => {
    // const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(35);
    // const [startTimer, setStartTimer] = useState(false);
    // const [warning, setWarning] = useState(false);
    // const [boxShadowStyles, setBoxShadowStyles] = useState("0 0 16px 8px yellow inset");

    // useEffect(() => {
    //     let timer;

    //     if (startTimer) {
    //         timer = setInterval(() => {
    //             if (seconds > 0) {
    //                 if (minutes === 0) {
    //                     if (seconds > 11 && seconds <= 31) {
    //                         setBoxShadowStyles("0 0 16px 8px yellow inset");
    //                         setWarning(prevWarning => !prevWarning);
    //                     } else if (seconds <= 11) {
    //                         setBoxShadowStyles("0 0 16px 8px red inset");
    //                         setWarning(prevWarning => !prevWarning);
    //                     }

    //                     setSeconds(seconds - 1);
    //                 } else {
    //                     setSeconds(seconds - 1);
    //                 }

    //             } else {
    //                 if (minutes === 0) {
    //                     clearInterval(timer)
    //                     setWarning(true);
    //                 } else {
    //                     setMinutes(minutes - 1);
    //                     setSeconds(59);
    //                 }
    //             } 
    //         }, 1000);
    //     }
    
    //     return () => {
    //         clearInterval(timer);
    //     };
    // });

    // function handleClick() {
    //     setStartTimer(true);
    //     setWarning(false);
    // }
    const audio = new Audio(nflChime);

    function handleClick() {
        audio.play();
    }
    
    return (

        <div className={classes.Timer}>
            <h1 className={classes.TimerPaused} onClick={handleClick}><RoomServiceIcon fontSize="large" /></h1>
        </div>
        // <div className={classes.Timer} onClick={handleClick}>
        //     {!startTimer
        //         ? <h1 className={classes.TimerPaused}>START DRAFT</h1>
        //         : <h1 className={classes.Time} style={{
        //             boxShadow: warning && boxShadowStyles
        //         }}>{minutes} : {seconds < 10 ? String(seconds).padStart(2, "0") : seconds}</h1>
        //     }
        // </div>
    );
}

export default Timer;