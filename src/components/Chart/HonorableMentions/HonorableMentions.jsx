import React from "react";
import {useSelector} from "react-redux";

import Selection from "../../Selections/Selection/Selection";

import classes from "./HonorableMentions.module.css";

const HonorableMentions = ({handleSelection, setModalContent, setShowModal}) => {
    let honorableMentions = useSelector(state => state.chart.chart.filter(selection => selection.honorableMention));
    honorableMentions = honorableMentions.map(selection => (
        <div key={selection.chartId} className={classes.Selection} onClick={() => handleSelection(selection.id)}>
            <Selection selectionData={selection} />
        </div>
    ));

    function handleClick() {
        setModalContent(
            <div className={classes.ModalContent}>
                <h2>Honorable Mentions</h2>
                <div className={classes.Selections}>
                    {honorableMentions}
                </div>
            </div>
        );
        setShowModal(true);
    }

    return (
        <div className={classes.HonorableMentions}>
            <h4 onClick={handleClick}>Honorable Mentions</h4>
            <div className={classes.Selections}>
                {honorableMentions}
            </div>
        </div>
    );
}

export default HonorableMentions;