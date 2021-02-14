import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import Backdrop from "../UI/Backdrop/Backdrop";
import Header from "./Header/Header";
import Modal from "../UI/Modal/Modal";
import SearchBar from "./SubmittedSelections/SeachBar/SearchBar";
import SubmittedSelections from "./SubmittedSelections/SubmittedSelections";

import classes from "./SubmitSelections.module.css";
import {getSubmittedSelections} from "../../store/actions/submittedSelections";

const SubmitSelections = () => {
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubmittedSelections());
    }, [dispatch]);

    return (
        <div className={classes.SubmitSelections}>
            <Backdrop showModal={showModal} setShowModal={setShowModal} />
            <Modal showModal={showModal}>
                {modalContent}
            </Modal>
            <div className={classes.MainContent}>
                <Header />
                <SearchBar />
                <SubmittedSelections setModalContent={setModalContent} setShowModal={setShowModal} />
            </div>
        </div>
    );
}

export default SubmitSelections;