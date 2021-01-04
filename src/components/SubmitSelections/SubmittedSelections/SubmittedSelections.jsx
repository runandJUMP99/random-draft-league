import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"; 

import AddSelection from "../../AddSelection/AddSelection";
import SubmittedSelection from "./SubmittedSelection/SubmittedSelection";

import classes from "./SubmittedSelections.module.css";
import {getSubmittedSelections} from "../../../store/actions/submittedSelections";

const SubmittedSelections = ({setModalContent, setShowModal}) => {
    let submittedSelections = useSelector(state => state.submittedSelections);
    const selectedSelections = submittedSelections.filter(selection => selection.isSelected);
    const notSelectedSelections = submittedSelections.filter(selection => !selection.isSelected);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    let count = 0;

    useEffect(() => {
        dispatch(getSubmittedSelections());
    }, [dispatch]);

    selectedSelections.sort((a, b) => {
        return a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'});
    });

    notSelectedSelections.sort((a, b) => {
        return a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'});
    });

    submittedSelections = notSelectedSelections.concat(selectedSelections);
    
    function handleClick(id) {
        const selectedSubmission = submittedSelections.filter(selection => selection.id === id);

        if (!selectedSubmission[0].isSelected) {
            if (token) {
                setModalContent(
                    <AddSelection setShowModal={setShowModal} submittedSelection={selectedSubmission[0]} />
                );
            } else {
                setModalContent(
                    <SubmittedSelection 
                        from={selectedSubmission[0].from}
                        id={selectedSubmission[0].id}
                        name={selectedSubmission[0].name} 
                        onClick={() => {}}
                        styles={{height: "100%", margin: "auto", textAlign: "center", width: "100%"}}
                    />
                );
            }
    
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