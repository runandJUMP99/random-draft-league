import React from "react";

import RoundSummary from "./RoundSummary/RoundSummary";
import Selection from "../../../Selections/Selection/Selection";

import classes from "./Round.module.css";

const Round = ({handleSelection, round, selections, setModalContent, setShowModal}) => {
    function handleClick() {
        setModalContent(<RoundSummary round={round} selections={selections} />);
        setShowModal(true);
    }
    
    return (
        <div className={classes.Round} style={{justifyContent: round % 2 === 0 && "space-between"}}>
            <h2 onClick={handleClick}>Round {round}</h2>
            <div className={classes.Selections} style={{flexDirection: round % 2 === 0 && "column-reverse"}}>
                {selections.map(selection => {
                    if (typeof selection === "object") {
                        return (
                            <div key={selection.chartId} onClick={() => handleSelection(selection.id)}>
                                <Selection selectionData={selection} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default Round;