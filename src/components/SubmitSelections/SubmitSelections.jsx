import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "../UI/Backdrop/Backdrop";
import DarkModeSlider from "./DarkModeSlider/DarkModeSlider";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Modal from "../UI/Modal/Modal";
import Over18Message from "./Over18Message/Over18Message";
import SearchBar from "../UI/SeachBar/SearchBar";
import SubmittedSelections from "./SubmittedSelections/SubmittedSelections";

import classes from "./SubmitSelections.module.css";
import { getSubmittedSelections } from "../../store/actions/submittedSelections";

const SubmitSelections = () => {
  const [clickable, setClickable] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [over18Clicked, setOver18Clicked] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  let submittedSelections = useSelector(state => state.submittedSelections);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (submittedSelections.length === 0) {
      dispatch(getSubmittedSelections());
    }

    // modal to notify users that website is for users 18 and up
    if (!over18Clicked && !token) {
      setModalContent(<Over18Message setOver18Clicked={setOver18Clicked} />);
      setShowModal(true);
    } else {
      setClickable(true);
      setOver18Clicked(true);
      setShowModal(false);
    }
  }, [
    dispatch,
    over18Clicked,
    setModalContent,
    setShowModal,
    submittedSelections,
    token,
  ]);

  // if a user has typed something in the search bar, filter through the selections and return the results
  if (search.length > 0) {
    submittedSelections = submittedSelections.filter(selection => {
      return (
        selection.from.toLowerCase().includes(search.toLowerCase()) ||
        selection.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  return (
    <div
      className={classes.SubmitSelections}
      style={{ background: darkMode && "#3b3b3b" }}
    >
      <Backdrop
        clickable={clickable}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Modal showModal={showModal}>{modalContent}</Modal>
      <div
        className={classes.MainContent}
        style={{ filter: !over18Clicked && "blur(8px)" }}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className={classes.Controls}>
          <SearchBar
            search={search}
            setSearch={setSearch}
            stylesIcon={{ fill: darkMode && "#eee" }}
          />
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
};

export default SubmitSelections;
