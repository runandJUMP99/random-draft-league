import React, {useEffect, useState} from "react";

import classes from "./LastWeekWinners.module.css";

const LastWeekWinners = ({winners}) => {
    const [currentName, setCurrentName] = useState(0);
    const [transitionStart, setTransitionStart] = useState(false);
    const [transitionEnd, setTransitionEnd] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTransitionStart(true);
            setTransitionEnd(false);

            setTimeout(() => {
                setTransitionStart(false);
                setTransitionEnd(true);
                
                setTimeout(() => {
                    setTransitionEnd(false);
                }, 1000);
            }, 4000);

            
            if (currentName < winners.length - 1) {
                setCurrentName(currentName + 1)
            } else { 
                setCurrentName(0);
            }
        }, 5000);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <div className={classes.LastWeekWinners}>
            {winners.length > 0
                && <h4>Last Week's Winners: 
                    <span className={classes.Animation} style={{
                        opacity: transitionStart && 1,
                        transform:  transitionStart ? "translateX(0)" : transitionEnd && "translateX(-2.5rem)"
                    }}>{winners[currentName].name}</span>
                </h4>}
        </div>
    );
}

export default LastWeekWinners;