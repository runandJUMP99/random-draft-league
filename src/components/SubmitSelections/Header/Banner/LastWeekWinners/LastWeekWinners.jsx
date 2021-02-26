import React, {useEffect, useState} from "react";

import classes from "./LastWeekWinners.module.css";

const LastWeekWinners = () => {
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
        }, 3000);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <div className={classes.LastWeekWinners}>
            Last Week's Winners: <span>{dummyData[currentName].name}</span>
        </div>
    );
}

export default LastWeekWinners