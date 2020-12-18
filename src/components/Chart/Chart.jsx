import React, {useState} from "react";

import classes from "./Chart.module.css";

const Chart = () => {
    const [chart, setChart] = useState([]);
    return (
        <div className={classes.Chart}>
            Chart
        </div>
    );
}

export default Chart;