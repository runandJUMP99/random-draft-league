import React from "react";

import HonorableMentions from "./HonorableMentions/HonorableMentions";
import Players from "./Players/Players";
import Rounds from "./Rounds/Rounds";

import classes from "./Chart.module.css";

const Chart = ({handleSelection, setModalContent, setShowModal, showModal}) => {
    return (
        <div className={classes.Chart}>
            <div className={classes.PlayersAndRounds}>
                <Players setModalContent={setModalContent} setShowModal={setShowModal} />
                <Rounds handleSelection={handleSelection} setModalContent={setModalContent} setShowModal={setShowModal} />
            </div>
            <HonorableMentions handleSelection={handleSelection} setModalContent={setModalContent} setShowModal={setShowModal} />
        </div>
    );
}

export default Chart;