import React, {useEffect, useState} from "react";

import classes from "./PickStreakLeaders.module.css";

const PickStreakLeaders = ({pickStreakLeaders}) => {
    const [currentName, setCurrentName] = useState(0);
    const [transitionStart, setTransitionStart] = useState(false);
    const [transitionEnd, setTransitionEnd] = useState(false);

    useEffect(() => {
        const pickStreakTimer = setInterval(() => {
            setTransitionStart(true);
            setTransitionEnd(false);
            
            if (currentName < pickStreakLeaders.length - 1) {
                setCurrentName(currentName + 1)
            } else { 
                setCurrentName(0);
            }
            
            setTimeout(() => {
                setTransitionStart(false);
                setTransitionEnd(true);
                
                setTimeout(() => {
                    setTransitionEnd(false);
                }, 1000);
            }, 3000);
        }, 4000);

        return () => {
            clearInterval(pickStreakTimer);
        }
    });

    return (
        <div className={classes.PickStreakLeaders}>
            {pickStreakLeaders.length > 0
                && <h4>Last Week's Winners: 
                    <span className={classes.Animation} style={{
                        opacity: transitionStart && 1,
                        transform:  transitionStart ? "translateX(0)" : transitionEnd && "translateX(-2.25rem)"
                    }}>{pickStreakLeaders[currentName].name}</span>
                </h4>}
        </div>
    );
}

export default PickStreakLeaders;