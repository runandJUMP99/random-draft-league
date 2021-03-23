import React from "react";

import classes from "./LastWeekWinners.module.css";

const LastWeekWinners = ({darkMode, winners}) => {
    return (
        <div className={classes.LastWeekWinners}>
            {winners.length > 0
                && <h4 style={{color: darkMode && "lightblue"}}>Last Week's Winners: 
                    <div className={classes.AnimationContainer}>
                        <div className={classes.Animation}>
                            {winners.map(winner => (
                                <span key={winner.userId} style={{color: darkMode && "lightgreen"}}>
                                    {winner.name.substring(0, 10)}
                                </span>
                            ))}
                        </div>
                    </div>
                </h4>}
        </div>
    );
}

export default LastWeekWinners;