import React from "react";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import CorgiSwim from "../UI/CorgiSwim/CorgiSwim";
import Selections from "../Selections/Selections";

import classes from "./Board.module.css";

const Board = ({
  fade,
  search,
  setFade,
  handleSelection,
  selectionContent,
  selectionSelected,
  setSelectionSelected,
  tieredView,
}) => {
  const randomNumber = Math.floor(Math.random() * 10);

  function handleClick() {
    setFade(true);

    setTimeout(() => {
      setSelectionSelected(false);
      setFade(false);
    }, 500);
  }

  return (
    <div className={classes.Board}>
      <div className={classes.BoardContent} style={{ opacity: fade && 0 }}>
        {selectionSelected && (
          <ArrowBackIcon
            className={classes.ArrowBack}
            fontSize="large"
            onClick={handleClick}
          />
        )}
        {selectionSelected ? (
          selectionContent
        ) : (
          <Selections
            search={search}
            handleSelection={handleSelection}
            tieredView={tieredView}
          />
        )}
        {selectionSelected && randomNumber === 0 && <CorgiSwim />}
      </div>
    </div>
  );
};

export default Board;
