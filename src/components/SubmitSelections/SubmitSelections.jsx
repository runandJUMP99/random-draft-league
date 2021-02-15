import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Backdrop from "../UI/Backdrop/Backdrop";
import Header from "./Header/Header";
import Modal from "../UI/Modal/Modal";
import SearchBar from "./SubmittedSelections/SeachBar/SearchBar";
import SubmittedSelections from "./SubmittedSelections/SubmittedSelections";

import classes from "./SubmitSelections.module.css";
import {getSubmittedSelections} from "../../store/actions/submittedSelections";

const SubmitSelections = () => {
    const [modalContent, setModalContent] = useState(null);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    let submittedSelections = useSelector(state => state.submittedSelections);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubmittedSelections());
    }, [dispatch]);

    if (search.length > 0) {
        submittedSelections = submittedSelections.filter(selection => {
            return selection.from.toLowerCase().includes(search.toLowerCase()) || selection.name.toLowerCase().includes(search.toLowerCase());
        });
    }
    
    return (
        <div className={classes.SubmitSelections}>
            <Backdrop showModal={showModal} setShowModal={setShowModal} />
            <Modal showModal={showModal}>
                {modalContent}
            </Modal>
            <div className={classes.MainContent}>
                <Header />
                <SearchBar setSearch={setSearch} search={search} />
                <SubmittedSelections
                    setModalContent={setModalContent}
                    setShowModal={setShowModal}
                    submittedSelections={submittedSelections}
                />
            </div>
        </div>
    );
}

export default SubmitSelections;