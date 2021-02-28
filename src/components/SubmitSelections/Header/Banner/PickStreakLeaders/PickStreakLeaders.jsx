import React, {useEffect, useState} from "react";

import classes from "./PickStreakLeaders.module.css";

const PickStreakLeaders = () => {
    const [currentName, setCurrentName] = useState(0);
    const dummyData = [
        {name: "User 1"},
        {name: "User 2"},
        {name: "User 3"}
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            if (currentName < dummyData.length - 1) {
                setCurrentName(currentName + 1)
            } else { 
                setCurrentName(0);
            }
        }, 4000);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <div className={classes.PickStreakLeaders}>
            Pick Streak Leaders: <div className={classes.Animation}>{dummyData[currentName].name}</div>
        </div>
    );
}

export default PickStreakLeaders;