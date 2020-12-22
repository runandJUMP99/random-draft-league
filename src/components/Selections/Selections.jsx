import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Selection from "./Selection/Selection";

import classes from "./Selections.module.css";
import {getSelections} from "../../store/actions/selections";

const Selections = ({showModal, handleSelection}) => {
    const selections = useSelector(state => state.selections.selections);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelections());
    }, [dispatch]);

    return (
        <div className={classes.Selections}>
            {selections.map(selection => (
                <div key={selection.id} onClick={() => handleSelection(selection.id)}>
                    <Selection 
                        selectionData={selection} 
                        showModal={showModal}
                        handleSelection={handleSelection}
                    />
                </div>
            ))}
        </div>
    );
}

export default Selections;