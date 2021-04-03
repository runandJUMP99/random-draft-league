import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import AddPlayer from "./Chart/Players/AddPlayer/AddPlayer";
import AddSelection from "./AddSelection/AddSelection";
import Backdrop from "./UI/Backdrop/Backdrop";
import Board from "./Board/Board";
import Chart from "./Chart/Chart";
import Controls from "./Controls/Controls";
import DraftTitle from "./DraftTitle/DraftTitle";
import Logo from "./UI/Logo/Logo";
import Modal from "./UI/Modal/Modal";
import Selection from "./Selections/Selection/Selection";
import Timer from "./Timer/Timer";
import Webcam from "./Webcam/Webcam";

import classes from "./Layout.module.css";
import {editSelection, setSelectionId} from "../store/actions/selections";
import {setPlayerId} from "../store/actions/players";

const Layout = () => {
    const [display, setDisplay] = useState(true); //display board or chart
    const [fade, setFade] = useState(false); //fade effect for board and chart
    const [forward, setForward] = useState(true); //round direction
    const [modalContent, setModalContent] = useState(null);
    const [order, setOrder] = useState(0); //pick number of draft
    const [playerTurn, setPlayerTurn] = useState(0);
    const [round, setRound] = useState(1);
    const [selectionContent, setSelectionContent] = useState(null); //display approriate content board/chart
    const [selectionSelected, setSelectionSelected] = useState(false); //handle display of chart or board
    const [showModal, setShowModal] = useState(false);
    const chart = useSelector(state => state.selections.selections).filter(selection => selection.isSelected && !selection.honorableMention);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    const customPlayers = useSelector(state => state.players.players); //players added by the admin
    const userPlayers = useSelector(state => state.users).filter(user => user.isFranchise).sort((a, b) => a.order - b.order); //players with accounts sorted by their order number
    const players = userPlayers.concat(customPlayers);
    const selections = useSelector(state => state.selections.selections);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => { //find what the current round is and who's turn it is if page reloads
        if (chart.length !== 0) {
            const currentRound = Math.floor(chart.length / players.length) + 1; //checks what round the game is currently on
            const currentPlayerTurn = chart.length % players.length; //checks which player's turn it is

            setOrder(chart.length);
            setRound(currentRound);

            if (currentRound % 2 === 0) {
                setPlayerTurn(players.length - currentPlayerTurn - 1);
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
        setFade(true);

        setTimeout(() => {
            setSelectionSelected(true);
            setFade(false);
        }, 500);

        setSelectionContent(
            <Selection 
                handleAddSelection={handleAddSelection}
                lockInSelection={lockInSelection} 
                selectionData={selectionData[0]}
                selectionSelected={!selectionSelected}
                showModal={!showModal}
                setFade={setFade}
                setSelectionSelected={setSelectionSelected}
            />
        );
    }
    
    function lockInSelection(id, honorableMention, undo) {
        let newSelection = selections.find(selection => selection.id === id);
        
        if (honorableMention) {
            newSelection = {
                ...newSelection,
                honorableMention: true,
                isSelected: true,
                order: null,
                player: null,
                roundSelected: null
            }
        } else if (undo) {
            newSelection = {
                ...newSelection,
                honorableMention: false,
                isSelected: false,
                order: null,
                player: null,
                roundSelected: null
            }

            if (!forward) {
                if (playerTurn === 0) {
                    setRound(prevRound => prevRound - 1);
                    setForward(true);
                } else {
                    setPlayerTurn(prevTurn => prevTurn - 1);
                }
            } else {
                if (playerTurn === players.length - 1) {
                    setRound(prevRound => prevRound - 1);
                    setForward(false);
                } else {
                    setPlayerTurn(prevTurn => prevTurn + 1);                
                }
            }
        } else {
            const playerId = players[playerTurn].userId;
            newSelection = {
                ...newSelection,
                honorableMention: false,
                isSelected: true,
                order: order,
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
        }

        dispatch(editSelection(id, newSelection, token));
        setSelectionSelected(false);
        setSelectionContent(null);
        setOrder(prevOrder => prevOrder + 1);
        handleDisplay();
    }
 
    function handleAddPlayer(edit) {
        setModalContent(<AddPlayer setShowModal={setShowModal} />);

        if (!edit) {
            dispatch(setPlayerId(null));
        }
        
        setShowModal(true);
    }

    function handleDisplay() {
        setDisplay(prevDisplay => !prevDisplay);
    }

    return (
        <div className={classes.Layout}>
            {!isAuthenticated && <Redirect to="/" />}
            <div className={classes.Background}></div>
            <Backdrop showModal={showModal} setShowModal={setShowModal} />
            <Modal showModal={showModal}>
                {modalContent}
            </Modal>
            <div style={{transform: !display && "translateX(-100%)", transition: "all 0.75s ease-in-out"}}>
                <Board
                    fade={fade}
                    setFade={setFade}
                    handleSelection={handleSelection}
                    selectionContent={selectionContent}
                    selectionSelected={selectionSelected}
                    setSelectionSelected={setSelectionSelected}
                /> 
            </div>
            <div style={{transform: display && "translateX(100%)", transition: "all 0.75s ease-in-out"}}>
                <Chart 
                    chart={chart}
                    fade={fade}
                    setFade={setFade}
                    handleSelection={handleSelection}
                    setModalContent={setModalContent} 
                    selectionContent={selectionContent}
                    selectionSelected={selectionSelected}
                    setSelectionSelected={setSelectionSelected}
                    setShowModal={setShowModal}
                    showModal={showModal}
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
            <Logo />
            <DraftTitle />
        </div>
    );
}

export default Layout;