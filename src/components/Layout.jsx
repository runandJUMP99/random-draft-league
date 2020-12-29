import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import AddPlayer from "./Chart/Players/AddPlayer/AddPlayer";
import AddSelection from "./AddSelection/AddSelection";
import Backdrop from "./UI/Backdrop/Backdrop";
import Board from "./Board/Board";
import Chart from "./Chart/Chart";
import Controls from "./Controls/Controls";
import DraftTitle from "./DraftTitle/DraftTitle";
import Modal from "./UI/Modal/Modal";
import Selection from "./Selections/Selection/Selection";
import Timer from "./Timer/Timer";
import Webcam from "./Webcam/Webcam";

import classes from "./Layout.module.css";
import {setSelectionId} from "../store/actions/selections";
import {addToChart} from "../store/actions/chart";
import {editSelection} from "../store/actions/selections";

const Layout = () => {
    const [display, setDisplay] = useState(true)
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [playerTurn, setPlayerTurn] = useState(0);
    const [forward, setForward] = useState(true);
    const [round, setRound] = useState(1);
    const chart = useSelector(state => state.chart);
    const players = useSelector(state => state.players);
    const selections = useSelector(state => state.selections.selections);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (chart.length !== 0) {
            const currentRound = Math.floor(chart.length / players.length) + 1; //checks what round the game is currently on
            setRound(currentRound);
            
            const currentPlayerTurn = chart.length % players.length; //checks which player's turn it is

            if (currentRound % 2 === 0) {
                switch (currentPlayerTurn) {
                    case 0:
                        setPlayerTurn(players.length - 1);
                        break;
                    case 1:
                        setPlayerTurn(players.length - 2);
                        break;
                    case 2:
                        setPlayerTurn(players.length - 3);
                        break;
                    case 3:
                        setPlayerTurn(players.length - 4);
                        break;
                    case 4:
                        setPlayerTurn(players.length - 5);
                        break;
                    case 5:
                        setPlayerTurn(players.length - 6);
                        break;
                    case 6:
                        setPlayerTurn(players.length - 7);
                        break;
                    case 7:
                        setPlayerTurn(players.length - 8);
                        break;
                    case 8:
                        setPlayerTurn(players.length - 9);
                        break;
                    case 9:
                        setPlayerTurn(players.length - 10);
                        break;
                    default:
                        break;
                }
            } else {
                setPlayerTurn(currentPlayerTurn);
            }
        }
    }, [chart, players]);
    
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
                setShowModal={setShowModal}
            />
        );
    }
    
    function lockInSelection(id) {
        const playerId = players[playerTurn].playerId;
        let newSelection = selections.find(selection => selection.id === id);

        newSelection = {
            ...newSelection,
            isSelected: true,
            player: playerId,
            roundSelected: round
        }

        if (forward) {            
            if (playerTurn === players.length - 1) {
                setRound(prevRound => prevRound + 1);
                setForward(false);
            } else {
                setPlayerTurn(prevTurn => prevTurn + 1);
            }
        } else {
            if (playerTurn === 0) {
                setRound(prevRound => prevRound + 1);
                setForward(true);
            } else {
                setPlayerTurn(prevTurn => prevTurn - 1);                
            }
        }

        dispatch(addToChart(newSelection));
        // dispatch(editSelection(newSelection.id, newSelection))
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
            <div style={{transform: !display && "translateX(-100%)", transition: "all 0.75s ease-in-out"}}>
                <Board
                    handleSelection={handleSelection}
                /> 
            </div>
            <div style={{transform: display && "translateX(100%)", transition: "all 0.75s ease-in-out"}}>
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
                setModalContent={setModalContent}
                setShowModal={setShowModal}
            />
            <Webcam />
            <Timer />
            <DraftTitle />
        </div>
    );
}

export default Layout;