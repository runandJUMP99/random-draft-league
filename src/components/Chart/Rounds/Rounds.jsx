import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Round from "./Round/Round";

import classes from "./Rounds.module.css";
import {getChart} from "../../../store/actions/chart";

const Rounds = () => {
    const chart = useSelector(state => state.chart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChart());
    }, [dispatch]);

    return (
        <div className={classes.Rounds}>
            <Round selections={chart} />
        </div>
    );
}

export default Rounds;