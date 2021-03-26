import React from "react";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CorgiSwim from "../UI/CorgiSwim/CorgiSwim";
import HonorableMentions from "./HonorableMentions/HonorableMentions";
import Players from "./Players/Players";
import Rounds from "./Rounds/Rounds";

import classes from "./Chart.module.css";

const Chart = ({chart, fade, setFade, handleSelection, setModalContent, setShowModal, selectionContent, selectionSelected, setSelectionSelected}) => {
    const randomNumber = Math.floor(Math.random() * 10);
    
    function handleClick() {
        setFade(true);

        setTimeout(() => {
            setSelectionSelected(false)
            setFade(false);
        }, 500);
    }

    return (
        <div className={classes.Chart}>
            <div className={classes.ChartContent} style={{opacity: fade && 0}}>
                {selectionSelected && <ArrowBackIcon className={classes.ArrowBack} fontSize="large" onClick={handleClick} /> }
                {selectionSelected ? selectionContent 
                    : <>
                        <div className={classes.PlayersAndRounds}>
                            <Players setModalContent={setModalContent} setShowModal={setShowModal} />
                            <Rounds chart={chart} handleSelection={handleSelection} setModalContent={setModalContent} setShowModal={setShowModal} />
                        </div>
                        <HonorableMentions handleSelection={handleSelection} setModalContent={setModalContent} setShowModal={setShowModal} />
                    </>
                }
                {(selectionSelected && randomNumber === 0) && <CorgiSwim /> }
            </div>
        </div>
    );
}

export default Chart;