import React from "react";

import classes from "./PickStreakLeaders.module.css";

const PickStreakLeaders = ({darkMode, pickStreakLeaders}) => {
    return (
        <div className={classes.PickStreakLeaders}>
            {pickStreakLeaders.length > 0
                && <h4 style={{color: darkMode && "lightBlue"}}>Pick Streak Leaders: 
                    <div className={classes.AnimationContainer}>
                        <div className={classes.Animation}>
                            {pickStreakLeaders.map(pickLeader => (
                                <span key={pickLeader.userId} style={{color: darkMode && "lightgreen"}}>
                                    {pickLeader.name.substring(0, 10)} - {pickLeader.pickStreak}
                                </span>
                            ))}
                        </div>
                    </div>
                </h4>}
        </div>
    );
}

export default PickStreakLeaders;