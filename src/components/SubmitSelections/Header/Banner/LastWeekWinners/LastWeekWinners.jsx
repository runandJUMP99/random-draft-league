import React from "react";

import classes from "./LastWeekWinners.module.css";

const LastWeekWinners = ({winners}) => {
    return (
        <div className={classes.LastWeekWinners}>
            {winners.length > 0
                && <h4>Last Week's Winners: 
                    <div className={classes.AnimationContainer}>
                        <div className={classes.Animation}>
                            <span>
                                {winners[0].name.substring(0, 10)}
                            </span>
                            <span>
                                {winners[1].name.substring(0, 10)}
                            </span>
                            <span>
                                {winners[2].name.substring(0, 10)}
                            </span>
                        </div>
                    </div>
                </h4>}
        </div>
    );
}

export default LastWeekWinners;