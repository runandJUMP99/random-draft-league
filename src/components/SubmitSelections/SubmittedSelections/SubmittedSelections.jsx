import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"; 

import SubmittedSelection from "./SubmittedSelection/SubmittedSelection";

import classes from "./SubmittedSelections.module.css";
import {getSubmittedSelections} from "../../../store/actions/submittedSelections";

const SubmittedSelections = () => {
    const submittedSelections = useSelector(state => state.submittedSelections);
    const dispatch = useDispatch();
    let count = 0;

    useEffect(() => {
        dispatch(getSubmittedSelections());
    }, [dispatch]);

    submittedSelections.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <div className={classes.SubmittedSelections}>
            {submittedSelections.map(submittedSelection => {
                count++;
                return (
                    <SubmittedSelection 
                        key={submittedSelection.id} 
                        count={count} 
                        from={submittedSelection.from}
                        name={submittedSelection.name} 
                    />
                )
            })}
        </div>
    );
}

export default SubmittedSelections;