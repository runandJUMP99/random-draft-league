import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Selection from "./Selection/Selection";
import GlobalLoader from "../UI/GlobalLoader/GlobalLoader";

import classes from "./Selections.module.css";
import {getSelections} from "../../store/actions/selections";

const Selections = ({showModal, handleSelection}) => {
    const token = useSelector(state => state.auth.token);
    let selections = useSelector(state => state.selections.selections);
    const dispatch = useDispatch();
    
    const selectedSelections = selections.filter(selection => selection.isSelected);
    const notSelectedSelections = selections.filter(selection => !selection.isSelected);
    
    useEffect(() => {
        if (selections.length === 0) {
            dispatch(getSelections(token));
        }
    }, [dispatch, selections, token]);

    selectedSelections.sort((a, b) => {
        return a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'});
    });

    notSelectedSelections.sort((a, b) => {
        return a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'});
    });

    selections = notSelectedSelections.concat(selectedSelections);
    
    return (
        <div className={classes.Selections}>
            {selections.length === 0 ? <GlobalLoader /> : selections.map(selection => (
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