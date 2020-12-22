import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import AddSelection from "./AddSelection/AddSelection";
import Backdrop from "./UI/Backdrop/Backdrop";
import Board from "./Board/Board";
import Chart from "./Chart/Chart";
import Modal from "./UI/Modal/Modal";
import Selection from "./Selections/Selection/Selection";

import classes from "./Layout.module.css";
import {deleteSelections, setSelectionId} from "../store/actions/selections";

const Layout = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [chart, setChart] = useState([]);
    const selections = useSelector(state => state.selections.selections);
    const dispatch = useDispatch();

    function handleAddSelection() {
        setModalContent(<AddSelection setShowModal={setShowModal} />);           
        dispatch(setSelectionId(null));
        setShowModal(true);
    }
    
    function handleSelection(id) {
        const selectionData = selections.filter(selection => selection.id === id);
        
        dispatch(setSelectionId(id));
        setShowModal(true);
        setModalContent(<Selection lockInSelection={lockInSelection} selectionData={selectionData[0]} showModal={!showModal}/>);
    }
    
    function lockInSelection(id) {
        const newSelection = selections.find(selection => selection.id === id);

        setChart(prevChart => [...prevChart, newSelection]);
        setShowModal(false);
    }

    return (
        <div className={classes.Layout}>
            <Backdrop showModal={showModal} setShowModal={setShowModal} />
            <Modal showModal={showModal}>
                {modalContent}
            </Modal>
            <Board handleSelection={handleSelection} />
            <Chart chart={chart} />
            <button className={classes.Button} onClick={handleAddSelection}>Add Selection</button>
            <button onClick={() => dispatch(deleteSelections(selections))}>Clear Board</button>
        </div>
    );
}

export default Layout;