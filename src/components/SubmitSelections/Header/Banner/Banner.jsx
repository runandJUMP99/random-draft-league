import React, {useEffect, useState} from "react";

import LastWeekWinners from "./LastWeekWinners/LastWeekWinners";
import MostDrafted from "./MostDrafted/MostDrafted";
import PickStreakLeaders from "./PickStreakLeaders/PickStreakLeaders";

import classes from "./Banner.module.css";

const Banner = () => {
    const [currentDisplay, setCurrentDisplay] = useState(0);
    const displays = [
        <LastWeekWinners />,
        <MostDrafted />,
        <PickStreakLeaders />
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            if (currentDisplay < displays.length - 1) {
                setCurrentDisplay(currentDisplay + 1)
            } else { 
                setCurrentDisplay(0);
            }
        }, 12000);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <div className={classes.Banner}>
            <div className={classes.BannerContent}>
                {displays[currentDisplay]}
            </div>
        </div>
    );
}

export default Banner;