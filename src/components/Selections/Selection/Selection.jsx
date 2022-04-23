import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";
import UndoIcon from "@material-ui/icons/Undo";

import Button from "../../UI/Button/Button";

import classes from "./Selection.module.css";
import { getRounds } from "../../../store/actions/chart";
import { deleteSelection } from "../../../store/actions/selections";
import logo from "../../../assets/images/logo.png";

const Selection = ({
  handleAddSelection,
  lockInSelection,
  selectionData,
  selectionSelected,
  setFade,
  setSelectionSelected,
}) => {
  const chart = useSelector(state => state.selections.selections).filter(
    selection => selection.isSelected && !selection.honorableMention
  );
  const customPlayers = useSelector(state => state.players.players);
  const totalRounds = useSelector(state => state.chart.rounds);
  const token = useSelector(state => state.auth.token);
  const userPlayers = useSelector(state => state.users).filter(
    user => user.isFranchise
  );

  const players = userPlayers.concat(customPlayers);
  const dispatch = useDispatch();
  const description = selectionData.description
    ? selectionData.description
    : "";
  const name = selectionData.name ? selectionData.name : "";
  const totalSelections = players.length * totalRounds.rounds;
  const truncatedName = name.length > 12 ? name.substring(0, 12) + "..." : name;
  const selectedStyles = {
    boxShadow: selectionData.isSelected && "0 0 0 0",
    border: selectionSelected && "none",
    cursor: selectionSelected && "initial",
    // height: selectionSelected && "80%",
    margin: selectionSelected && "0 auto",
    maxWidth: selectionSelected ? "" : "11rem",
    width: selectionSelected && "80%",
  };

  useEffect(() => {
    if (!totalRounds.rounds) {
      dispatch(getRounds(token));
    }
  }, [dispatch, token, totalRounds]);

  function handleDelete() {
    setFade(true);

    setTimeout(() => {
      setSelectionSelected(false);
      setFade(false);
    }, 500);

    dispatch(deleteSelection(selectionData.id, token));
  }

  return (
    <div className={classes.Selection} style={selectedStyles}>
      {!selectionSelected && (
        <div
          className={classes.Overlay}
          style={{
            background:
              selectionData.isSelected &&
              "linear-gradient(rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.95))",
          }}
        >
          <h4
            style={{
              fontSize: "1.5rem",
            }}
          >
            {truncatedName}
          </h4>
        </div>
      )}
      <img
        src={selectionData.img ? selectionData.img : logo}
        alt="Selection"
        style={{
          height: selectionSelected && "20rem",
          overflow: !selectionSelected && "hidden",
          position: !selectionSelected && "absolute",
          width: selectionSelected && "20rem",
        }}
      />
      {selectionSelected && (
        <h4 style={{ color: "#575757", fontSize: "2rem", position: "initial" }}>
          {name}
        </h4>
      )}
      {selectionSelected && (
        <p style={{ color: "#575757", padding: selectionSelected && "0 1rem" }}>
          {description}
        </p>
      )}
      <div
        className={classes.Buttons}
        style={{ display: !selectionSelected && "none" }}
      >
        <button
          className={classes.LockIn}
          disabled={
            players.length === 0 ||
            (totalSelections !== 0 && chart.length >= totalSelections)
          }
          onClick={() => lockInSelection(selectionData.id)}
          style={{
            display: selectionData.isSelected && "none",
          }}
        >
          {players.length === 0 ? "PLEASE ADD PLAYERS" : "LOCK IN"}
        </button>
        <div className={classes.EditDeleteButtons}>
          <Button
            onClick={() => lockInSelection(selectionData.id, true)}
            style={{
              background: "#01023a",
              display: selectionData.isSelected && "none",
              margin: "0.25rem",
              padding: "0.25rem",
              position: "initial",
            }}
          >
            <StarIcon fontSize="small" />
          </Button>
          <Button
            onClick={() => lockInSelection(selectionData.id, false, true)}
            style={{
              background: "#01023a",
              display: !selectionData.isSelected && "none",
              margin: "0.25rem",
              padding: "0.25rem",
              position: "initial",
            }}
          >
            <UndoIcon fontSize="small" />
          </Button>
          <Button
            onClick={() => handleAddSelection(true)}
            style={{
              background: "#01023a",
              margin: "0.25rem",
              padding: "0.25rem",
              position: "initial",
            }}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button
            onClick={handleDelete}
            style={{
              background: "#01023a",
              display: selectionData.isSelected && "none",
              margin: "0.25rem",
              padding: "0.25rem",
              position: "initial",
            }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Selection;
