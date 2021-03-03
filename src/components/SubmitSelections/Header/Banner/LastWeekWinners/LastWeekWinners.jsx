import React, {useEffect, useState} from "react";

import classes from "./LastWeekWinners.module.css";

const LastWeekWinners = ({winners}) => {
    const [currentName, setCurrentName] = useState(0);
    const [transitionStart, setTransitionStart] = useState(false);
    const [transitionEnd, setTransitionEnd] = useState(false);

    useEffect(() => {
        
        const winnersTimer = setInterval(() => {
            setTransitionStart(true);
            setTransitionEnd(false);
            
            if (currentName < winners.length - 1) {
                setCurrentName(currentName + 1)
                
                setTimeout(() => {
                    setTransitionStart(false);
                    setTransitionEnd(true);
                    
                    setTimeout(() => {
                        setTransitionEnd(false);
                    }, 1000);
                }, 3000);
            } else { 
                clearInterval(winnersTimer);
            }      
        }, 4000);

        return () => {
            clearInterval(winnersTimer);
        }
    });

    return (
        <div className={classes.LastWeekWinners}>
            {winners.length > 0
                && <h4>Last Week's Winners: 
                    <span className={classes.Animation} style={{
                        opacity: transitionStart && 1,
                        transform:  transitionStart ? "translateX(0)" : transitionEnd && "translateX(-2.25rem)"
                    }}>{winners[currentName].name}</span>
                </h4>}
        </div>
    );
}

export default LastWeekWinners;