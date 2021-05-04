import React from "react";
import {useSelector} from "react-redux";

import Submission from "./Submission/Submission";

import classes from "./Submissions.module.css";

const Submissions = () => {
    const userId = useSelector(state => state.auth.userId);
    const submittedSelections = useSelector(state => state.submittedSelections).filter(submission => submission.userId === userId);

    if (submittedSelections.length === 0) {
        submittedSelections.push({name: "No submissions yet. Enter up to 3 submissions on the home page!"});
    }

    return (
        <div className={classes.Submissions}>
            {submittedSelections.map(submission => (
                <Submission
                    key={submittedSelections.length === 1 ? submission.name : submission.id}
                    draftId={submission.draftId}
                    id={submission.id}
                    isSelected={submission.isSelected}
                    name={submission.name}
                />
            ))}
        </div>
    );
}

export default Submissions;