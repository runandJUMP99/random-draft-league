import React, {useState} from "react";

import Backdrop from "../UI/Backdrop/Backdrop";
import Header from "./Header/Header";
import Modal from "../UI/Modal/Modal";
import SubmittedSelections from "./SubmittedSelections/SubmittedSelections";

import classes from "./SubmitSelections.module.css";

const SubmitSelections = () => {
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={classes.SubmitSelections}>
            <Backdrop showModal={showModal} setShowModal={setShowModal} />
            <Modal showModal={showModal}>
                {modalContent}
            </Modal>
            <div className={classes.MainContent}>
                <Header />
                <SubmittedSelections setModalContent={setModalContent} setShowModal={setShowModal} />
            </div>
        </div>
    );
}

export default SubmitSelections;