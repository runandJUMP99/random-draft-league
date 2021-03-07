import React from "react";
import {useSelector} from "react-redux"; 

import AddSelection from "../../AddSelection/AddSelection";
import SubmittedSelection from "./SubmittedSelection/SubmittedSelection";

import classes from "./SubmittedSelections.module.css";

const SubmittedSelections = ({setModalContent, setShowModal, submittedSelections}) => {
    const selectedSelections = submittedSelections.filter(selection => selection.isSelected);
    const notSelectedSelections = submittedSelections.filter(selection => !selection.isSelected);
    const token = useSelector(state => state.auth.token);
    let count = 0;

    selectedSelections.sort((a, b) => {
        return a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'});
    });

    notSelectedSelections.sort((a, b) => {
        return a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'});
    });

    submittedSelections = notSelectedSelections.concat(selectedSelections);
    
    function handleClick(id) {
        const selectedSubmission = submittedSelections.filter(selection => selection.id === id);

        if (!selectedSubmission[0].isSelected && token) {
            setModalContent(
                <AddSelection setShowModal={setShowModal} submittedSelection={selectedSubmission[0]} />
            );
    
            setShowModal(true);
        }
    }

    return (
        <div className={classes.SubmittedSelections}>
            {submittedSelections.map(submittedSelection => {
                count++;
                return (
                    <SubmittedSelection 
                        key={submittedSelection.id} 
                        count={count} 
                        from={submittedSelection.from}
                        id={submittedSelection.id}
                        isSelected={submittedSelection.isSelected}
                        name={submittedSelection.name} 
                        onClick={handleClick}
                    />
                )
            })}
        </div>
    );
}

export default SubmittedSelections;