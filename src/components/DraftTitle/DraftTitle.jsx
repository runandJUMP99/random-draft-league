import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "./DraftTitle.module.css";
import {getSelectionSubject, setSelectionSubject} from "../../store/actions/selections";

const DraftTitle = () => {
    const [subject, setSubject] = useState({name: "Click to Enter Title"});
    const [updating, setUpdating] = useState(false);
    const currentSubject = useSelector(state => state.selections.subject);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectionSubject());
    }, [dispatch]);

    function handleClick() {
        setUpdating(true);

        if (currentSubject) {
            setSubject({name: currentSubject.name});
        }
    }

    function handleSubmit(event) {
        let id = null;

        if (currentSubject) {
            id = currentSubject.id;
        }

        if (event.key === "Enter") {
            let updatedSubject = {
                ...subject,
                id: id
            };

            setUpdating(false);
            dispatch(setSelectionSubject(id, updatedSubject, token));
        }
    }

    return (
        <div className={classes.DraftTitle} onClick={handleClick}>
            {updating 
                ? <input 
                    autoComplete="off"
                    id="input"
                    type="text" 
                    placeholder="Enter Draft Title" 
                    onChange={(event) => setSubject({name: event.target.value})} value={subject.name}
                    onKeyPress={(event) => handleSubmit(event)} 
                /> 
                : <h1>{currentSubject ? currentSubject.name : subject.name}</h1>
            }
        </div>
    );
}

export default DraftTitle;