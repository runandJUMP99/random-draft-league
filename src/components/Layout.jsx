import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import AddIcon from '@material-ui/icons/Add';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import TableChartIcon from '@material-ui/icons/TableChart';

import AddSelection from "./AddSelection/AddSelection";
import Backdrop from "./UI/Backdrop/Backdrop";
import Board from "./Board/Board";
import Chart from "./Chart/Chart";
import Modal from "./UI/Modal/Modal";
import Selection from "./Selections/Selection/Selection";

import classes from "./Layout.module.css";
import {setSelectionId} from "../store/actions/selections";
import {addToChart} from "../store/actions/chart";

const Layout = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [display, setDisplay] = useState(true)
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

        dispatch(addToChart(newSelection));
        setShowModal(false);
    }

    function handleDisplay() {
        setDisplay(prevDisplay => !prevDisplay);
    }

    return (
        <div className={classes.Layout}>
            <Backdrop showModal={showModal} setShowModal={setShowModal} />
            <Modal showModal={showModal}>
                {modalContent}
            </Modal>
            <div style={{transform: !display && "translateX(-100%", transition: "all 0.75s ease-in-out"}}>
                <Board handleAddSelection={handleAddSelection} handleSelection={handleSelection} selections={selections} /> 
            </div>
            <div style={{transform: display && "translateX(100%", transition: "all 0.75s ease-in-out"}}>
                <Chart />
            </div>
            {
                display 
                    ? <span className={classes.Button} onClick={handleDisplay}><CallToActionIcon fontSize="large" /></span> 
                    : <span className={classes.Button} onClick={handleDisplay}><TableChartIcon fontSize="large" /></span>
            }
            <span className={classes.AddButton} onClick={handleAddSelection}><AddIcon fontSize="large" /></span>
        </div>
    );
}

export default Layout;