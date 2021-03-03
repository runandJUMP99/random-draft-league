import React, {useEffect, useState} from "react";

import classes from "./MostDrafted.module.css";

const MostDrafted = ({pickLeaders}) => {
    const [currentName, setCurrentName] = useState(0);
    const [transitionStart, setTransitionStart] = useState(false);
    const [transitionEnd, setTransitionEnd] = useState(false);

    useEffect(() => {
        const mostDraftedTimer = setInterval(() => {
            setTransitionStart(true);
            setTransitionEnd(false);
            
            if (currentName < pickLeaders.length - 1) {
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
            clearInterval(mostDraftedTimer);
        }
    });

    return (
        <div className={classes.MostDrafted}>
            {pickLeaders.length > 0
                && <h4>Last Week's Winners: 
                    <span className={classes.Animation} style={{
                        opacity: transitionStart && 1,
                        transform:  transitionStart ? "translateX(0)" : transitionEnd && "translateX(-2.25rem)"
                    }}>{pickLeaders[currentName].name}</span>
                </h4>}
        </div>
    );
}

export default MostDrafted;