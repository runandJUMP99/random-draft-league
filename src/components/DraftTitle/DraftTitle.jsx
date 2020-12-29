import React, {useState} from "react";

import classes from "./DraftTitle.module.css";

const DraftTitle = () => {
    const [draftTitle, setDraftTitle] = useState("Click to Enter Title");
    const [updating, setUpdating] = useState(false);

    function handleSubmit(event) {
        if (event.key === "Enter") {
            setUpdating(false);
        }
    }

    return (
        <div className={classes.DraftTitle} onClick={() => setUpdating(true)}>
            {updating 
                ? <input 
                    autoComplete="off"
                    id="input"
                    type="text" 
                    placeholder="Enter Draft Title" 
                    onChange={(event) => setDraftTitle(event.target.value)} value={draftTitle}
                    onKeyPress={(event) => handleSubmit(event)} 
                /> 
                : <h1>{draftTitle}</h1>
            }
        </div>
    );
}

export default DraftTitle;