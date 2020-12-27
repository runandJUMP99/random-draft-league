import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import AddPlayer from "./Chart/Players/AddPlayer/AddPlayer";
import AddSelection from "./AddSelection/AddSelection";
import Backdrop from "./UI/Backdrop/Backdrop";
import Board from "./Board/Board";
import Chart from "./Chart/Chart";
import Controls from "./Controls/Controls";
import Modal from "./UI/Modal/Modal";
import Selection from "./Selections/Selection/Selection";
import Timer from "./Timer/Timer";

import classes from "./Layout.module.css";
import {setSelectionId} from "../store/actions/selections";
import {addToChart} from "../store/actions/chart";
import {editSelection} from "../store/actions/selections";

const Layout = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [display, setDisplay] = useState(true)
    const [playerTurn, setPlayerTurn] = useState(0);
    const [forward, setForward] = useState(true);
    const players = useSelector(state => state.players);
    const selections = useSelector(state => state.selections.selections);
    const dispatch = useDispatch();
    
    function handleAddSelection(edit) {
        setModalContent(<AddSelection setShowModal={setShowModal} />);           

        if (!edit) {
            dispatch(setSelectionId(null));
        }
        
        setShowModal(true);
    }
    
    function handleSelection(id) {
        const selectionData = selections.filter(selection => selection.id === id);
        
        dispatch(setSelectionId(id));
        setShowModal(true);
        setModalContent(
            <Selection 
                handleAddSelection={handleAddSelection}
                lockInSelection={lockInSelection} 
                selectionData={selectionData[0]} 
                showModal={!showModal} 
            />
        );
    }
    
    function lockInSelection(id) {
        const playerId = players[playerTurn].playerId;
        let newSelection = selections.find(selection => selection.id === id);

        newSelection = {
            ...newSelection,
            isSelected: true,
            player: playerId
        }

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

        dispatch(addToChart(newSelection));
        dispatch(editSelection(newSelection.id, newSelection))
        setShowModal(false);
        handleDisplay();
    }
 
    function handleAddPlayer() {
        setModalContent(<AddPlayer setShowModal={setShowModal} />);
        setShowModal(true);
    }

    function handleDisplay() {
        setDisplay(prevDisplay => !prevDisplay);
    }

    return (
        <div className={classes.Layout}>
            <div className={classes.Background}></div>
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
                <Chart 
                    handleSelection={handleSelection}
                    setModalContent={setModalContent} 
                    setShowModal={setShowModal}
                />
            </div>
            <Controls 
                display={display} 
                handleDisplay={handleDisplay} 
                handleAddSelection={handleAddSelection}
                handleAddPlayer= {handleAddPlayer} 
            />
            <Timer />
        </div>
    );
}

export default Layout;