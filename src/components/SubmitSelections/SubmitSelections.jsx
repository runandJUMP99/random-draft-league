import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Backdrop from "../UI/Backdrop/Backdrop";
import DarkModeSlider from "./DarkModeSlider/DarkModeSlider";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Modal from "../UI/Modal/Modal";
import SearchBar from "../UI/SeachBar/SearchBar";
import SubmittedSelections from "./SubmittedSelections/SubmittedSelections";

import classes from "./SubmitSelections.module.css";
import {getSubmittedSelections} from "../../store/actions/submittedSelections";

const SubmitSelections = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    let submittedSelections = useSelector(state => state.submittedSelections);
    const dispatch = useDispatch();

    useEffect(() => {
        if (submittedSelections.length === 0) {
            dispatch(getSubmittedSelections());
        }
    }, [dispatch, submittedSelections]);

    if (search.length > 0) {
        submittedSelections = submittedSelections.filter(selection => {
            return selection.from.toLowerCase().includes(search.toLowerCase()) || selection.name.toLowerCase().includes(search.toLowerCase());
        });
    }
    
    return (
        <div className={classes.SubmitSelections} style={{background: darkMode && "#3b3b3b"}}>
            <Backdrop showModal={showModal} setShowModal={setShowModal} />
            <Modal showModal={showModal}>
                {modalContent}
            </Modal>
            <div className={classes.MainContent}>
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <div className={classes.Controls}>
                    <SearchBar search={search} setSearch={setSearch} stylesIcon={{fill: darkMode && "#eee"}} />
                    <DarkModeSlider darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>
                <SubmittedSelections
                    setModalContent={setModalContent}
                    setShowModal={setShowModal}
                    submittedSelections={submittedSelections}
                />
            </div>
            <Footer />
        </div>
    );
}

export default SubmitSelections;