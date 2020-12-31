import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Selection from "./Selection/Selection";

import classes from "./Selections.module.css";
import {getSelections} from "../../store/actions/selections";

const Selections = ({showModal, handleSelection}) => {
    const dispatch = useDispatch();
    let selections = useSelector(state => state.selections.selections);
    const selectedSelections = selections.filter(selection => selection.isSelected);
    const notSelectedSelections = selections.filter(selection => !selection.isSelected);
    
    useEffect(() => {
        dispatch(getSelections());
    }, [dispatch]);

    selectedSelections.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    });

    notSelectedSelections.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    });

    selections = notSelectedSelections.concat(selectedSelections);
    
    return (
        <div className={classes.Selections}>
            {selections.map(selection => (
                <div className={classes.Selection} key={selection.id} onClick={() => handleSelection(selection.id)}>
                    <Selection 
                        selectionData={selection} 
                        showModal={showModal}
                    />
                </div>
            ))}
        </div>
    );
}

export default Selections;