import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import LastWeekWinners from "./LastWeekWinners/LastWeekWinners";
import MostDrafted from "./MostDrafted/MostDrafted";
import PickStreakLeaders from "./PickStreakLeaders/PickStreakLeaders";

import classes from "./Banner.module.css";
import {getUsers} from "../../../../store/actions/users";

const Banner = () => {
    const [currentDisplay, setCurrentDisplay] = useState(0);
    const [transitionStart, setTransitionStart] = useState(true);
    const [transitionEnd, setTransitionEnd] = useState(false);
    const users = useSelector(state => state.users);
    const pickLeaders = users.sort((a, b) => b.pickTotal - a.pickTotal).slice(0, 3); //sort array from most to least, than slice top 3
    const pickStreakLeaders = users.sort((a, b) => b.pickStreak - a.pickStreak).slice(0, 3);
    const winners = users.filter(user => user.isWinner);
    const dispatch = useDispatch();
    const displays = [
        <LastWeekWinners winners={winners} />,
        <MostDrafted pickLeaders={pickLeaders} />,
        <PickStreakLeaders pickStreakLeaders={pickStreakLeaders} />
    ];

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    useEffect(() => {        
        const bannerInterval = setInterval(() => {
            setTransitionStart(true);
            
            if (currentDisplay < displays.length - 1) {
                setCurrentDisplay(currentDisplay + 1)
            } else { 
                setCurrentDisplay(0);
            }
            
            setTimeout(() => {
                setTransitionStart(false);
                setTransitionEnd(true);
                
                setTimeout(() => {
                    setTransitionEnd(false);
                    clearInterval(bannerInterval);
                }, 1000);
            }, 11000);
        }, 12000);

        return () => {
            clearInterval(bannerInterval);
        }
    }, [currentDisplay, displays.length]);

    return (
        <div className={classes.Banner}>
            <div className={classes.BannerContent} style={{
                        opacity: transitionStart && 1,
                        transform:  transitionStart ? "translateY(0)" : (transitionEnd && "translateY(2rem)")
                    }}>
                {displays[currentDisplay]}
            </div>
        </div>
    );
}

export default Banner;