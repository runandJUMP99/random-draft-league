import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import LastWeekWinners from "./LastWeekWinners/LastWeekWinners";
// import MostDrafted from "./MostDrafted/MostDrafted";
// import PickStreakLeaders from "./PickStreakLeaders/PickStreakLeaders";

import classes from "./Banner.module.css";
import {getUsers} from "../../../../store/actions/users";

const Banner = () => {
    const winners = useSelector(state => state.users).filter(user => user.isWinner);
    const dispatch = useDispatch();
    // const [currentDisplay, setCurrentDisplay] = useState(0);
    // const displays = [
    //     <LastWeekWinners />,
    //     <MostDrafted />,
    //     <PickStreakLeaders />
    // ];

    useEffect(() => {
        dispatch(getUsers());
        // const timer = setInterval(() => {
        //     if (currentDisplay < displays.length - 1) {
        //         setCurrentDisplay(currentDisplay + 1)
        //     } else { 
        //         setCurrentDisplay(0);
        //     }
        // }, 12000);

        // return () => {
        //     clearInterval(timer);
        // }
    }, [dispatch]);

    return (
        <div className={classes.Banner}>
            <div className={classes.BannerContent}>
                <LastWeekWinners winners={winners} />
                {/* {displays[currentDisplay]} */}
            </div>
        </div>
    );
}

export default Banner;