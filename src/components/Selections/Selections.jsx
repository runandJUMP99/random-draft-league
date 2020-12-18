import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import AddSelection from "./AddSelection/AddSelection";
import Selection from "./Selection/Selection";

import classes from "./Selections.module.css";
import {getSelections} from "../../store/actions/selections";

const Selections = () => {
    const selections = useSelector(state => state.selections);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelections());
    }, []);

    return (
        <div className={classes.Selections}>
            <AddSelection />
            {selections.map(selection => (
                <Selection key={selection.name} selectionData={selection} />
            ))}
        </div>
    );
}

export default Selections;