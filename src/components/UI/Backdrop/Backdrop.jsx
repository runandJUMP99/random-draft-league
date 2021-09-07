import React from "react";

import classes from "./Backdrop.module.css";

function Backdrop({clickable, showModal, setShowModal}) {
    function handleClick() {
        if (clickable) {
            setShowModal(false)
        }
    }

    return <div className={classes.Backdrop} onClick={handleClick} style={{
                opacity: showModal ? 1 : 0,
                zIndex: showModal ? 50 : -1
                }}>
            </div>;
}

export default Backdrop;