import React from "react";

import LastWeekWinners from "./LastWeekWinners/LastWeekWinners";
import MostDrafted from "./MostDrafted/MostDrafted";
import PickStreakLeaders from "./PickStreakLeaders/PickStreakLeaders";

import classes from "./Banner.module.css";

const Banner = () => {
    return (
        <div className={classes.Banner}>
            <LastWeekWinners />
            {/* <MostDrafted />
            <PickStreakLeaders /> */}
        </div>
    );
}

export default Banner;