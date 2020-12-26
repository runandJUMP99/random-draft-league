import React from "react";

import Players from "./Players/Players";
import Rounds from "./Rounds/Rounds";

import classes from "./Chart.module.css";

const Chart = ({handleSelection, setModalContent, setShowModal}) => {
    return (
        <div className={classes.Chart}>
            <Players setModalContent={setModalContent} setShowModal={setShowModal} />
            <Rounds handleSelection={handleSelection} />
        </div>
    );
}

export default Chart;