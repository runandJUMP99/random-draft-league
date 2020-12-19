import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import AddSelection from "./AddSelection/AddSelection";
import Selection from "./Selection/Selection";

import classes from "./Selections.module.css";
import {getSelections} from "../../store/actions/selections";

const Selections = () => {
    const [selectionId, setSelectionId] = useState("");
    const selections = useSelector(state => state.selections);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelections());
    }, [dispatch]);

    return (
        <div className={classes.Selections}>
            <AddSelection selectionId={selectionId} setSelectionId={setSelectionId} />
            {selections.map(selection => (
                <Selection key={selection.id} selectionData={selection} setSelectionId={setSelectionId} />
            ))}
        </div>
    );
}

export default Selections;