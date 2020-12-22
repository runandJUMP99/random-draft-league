import React from "react";

import classes from "./Backdrop.module.css";

function Backdrop({showModal, setShowModal}) {
    return <div className={classes.Backdrop} onClick={() => setShowModal(false)} style={{
                opacity: showModal ? 1 : 0,
                zIndex: showModal ? 50 : -1
                }}>
            </div>;
}

export default Backdrop;