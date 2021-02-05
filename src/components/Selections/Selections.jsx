import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Selection from "./Selection/Selection";
import Spinner from "../UI/Spinner/Spinner";

import classes from "./Selections.module.css";
import {getSelections} from "../../store/actions/selections";

const Selections = ({showModal, handleSelection}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    let selections = useSelector(state => state.selections.selections);
    
    const selectedSelections = selections.filter(selection => selection.isSelected);
    const notSelectedSelections = selections.filter(selection => !selection.isSelected);
    
    useEffect(() => {
        // dispatch(getSelections(token)); TODO--FIX UPDATING SUBJECT AND ROUNDS
    }, [dispatch]);

    selectedSelections.sort((a, b) => {
        return a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'});
    });

    notSelectedSelections.sort((a, b) => {
        return a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'});
    });

    selections = notSelectedSelections.concat(selectedSelections);
    
    return (
        <div className={classes.Selections}>
            {selections.length === 0 ? <Spinner /> : selections.map(selection => (
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