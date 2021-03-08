import React from "react";

import classes from "./PickStreakLeaders.module.css";

const PickStreakLeaders = ({pickStreakLeaders}) => {
    return (
        <div className={classes.PickStreakLeaders}>
            {pickStreakLeaders.length > 0
                && <h4>Pick Streak Leaders: 
                    <div className={classes.AnimationContainer}>
                        <div className={classes.Animation}>
                            <span>
                                {pickStreakLeaders[0].name.substring(0, 10)} - {pickStreakLeaders[0].pickStreak}
                            </span>
                            <span>
                                {pickStreakLeaders[1].name.substring(0, 10)} - {pickStreakLeaders[1].pickStreak}
                            </span>
                            <span>
                                {pickStreakLeaders[2].name.substring(0, 10)} - {pickStreakLeaders[2].pickStreak}
                            </span>
                        </div>
                    </div>
                </h4>}
        </div>
    );
}

export default PickStreakLeaders;