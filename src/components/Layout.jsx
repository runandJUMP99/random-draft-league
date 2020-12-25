import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import AddIcon from '@material-ui/icons/Add';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import TableChartIcon from '@material-ui/icons/TableChart';

import AddSelection from "./AddSelection/AddSelection";
import Backdrop from "./UI/Backdrop/Backdrop";
import Board from "./Board/Board";
import Button from "./UI/Button/Button";
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
    const [playerTurn, setPlayerTurn] = useState(0);
    const [forward, setForward] = useState(true);
    const players = useSelector(state => state.players);
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
        const playerId = players[playerTurn].playerId;

        if (forward) {            
            if (playerTurn === players.length - 1) {
                setForward(false);
            } else {
                setPlayerTurn(prevTurn => prevTurn + 1);
            }
        } else {
            if (playerTurn === 0) {
                setForward(true);
            } else {
                setPlayerTurn(prevTurn => prevTurn - 1);                
            }
        }

        dispatch(addToChart(playerId, newSelection));
        setShowModal(false);
        handleDisplay();
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
                <Board 
                    handleAddSelection={handleAddSelection} 
                    handleSelection={handleSelection} 
                    selections={selections} 
                    setModalContent={setModalContent} 
                    setShowModal={setShowModal} 
                /> 
            </div>
            <div style={{transform: display && "translateX(100%", transition: "all 0.75s ease-in-out"}}>
                <Chart setModalContent={setModalContent} setShowModal={setShowModal}/>
            </div>
            {
                display 
                    ? <Button onClick={handleDisplay} style={{left: "50%", transform: "translateX(-50%)"}}>
                        <CallToActionIcon fontSize="large" />
                    </Button> 
                    : <Button onClick={handleDisplay} style={{left: "50%", transform: "translateX(-50%)"}}>
                        <TableChartIcon fontSize="large" />
                    </Button>
            }
            <Button onClick={handleAddSelection} style={{right: "1.5rem"}}>
                <AddIcon fontSize="large" />
            </Button>
        </div>
    );
}

export default Layout;