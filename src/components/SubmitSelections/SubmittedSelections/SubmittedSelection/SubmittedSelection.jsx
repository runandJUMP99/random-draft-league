import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../UI/Button/Button";

import classes from "./SubmittedSelection.module.css";
import { editSubmittedSelection } from "../../../../store/actions/submittedSelections";

const buttonStyles = {
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  height: "1.75rem",
  justifyContent: "center",
  position: "initial",
  width: "1.75rem",
};

const SubmittedSelection = ({ count, onClick, selection, styles }) => {
  const [showTime, setShowTime] = useState(false);
  const isAdmin = useSelector(
    // state => state.auth.userId === process.env.REACT_APP_FIREBASE_UID1
    state => state.auth.userId === process.env.REACT_APP_FIREBASE_UID2
  );
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  function handleClick() {
    onClick(selection.id);
  }

  function handleMouseEnter() {
    if (isAdmin) {
      setShowTime(true);
    }
  }

  function handleMouseLeave() {
    if (isAdmin) {
      setShowTime(false);
    }
  }

  function handleVote() {
    const updatedSelection = {
      ...selection,
      thumbsDown: selection.thumbsDown ? selection.thumbsDown++ : 1,
      thumbsUp: selection.thumbsUp ? selection.thumbsUp++ : 1,
      thumbsDownVoters: selection.thumbsDownVoters.includes(userId)
        ? selection.thumbsDownVoters.filter(voterId => voterId !== userId)
        : !selection.thumbsUpVoters.includes(userId)
        ? [...selection.thumbsDownVoters, userId]
        : selection.thumbsDownVoters,
      thumbsUpVoters: selection.thumbsUpVoters.includes(userId)
        ? selection.thumbsUpVoters.filter(voterId => voterId !== userId)
        : !selection.thumbsDownVoters.includes(userId)
        ? [...selection.thumbsUpVoters, userId]
        : selection.thumbsUpVoters,
    };
    dispatch(editSubmittedSelection(selection.id, updatedSelection, token));
  }

  return (
    <div
      className={classes.SubmittedSelection}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...styles,
        background: count % 2 === 0 ? "lightblue" : "lightgreen",
        boxShadow: selection.isSelected && "0 0 0 0",
        cursor: selection.isSelected && "initial",
        opacity: selection.isSelected && 0.6,
        transform:
          count % 2 === 0
            ? "rotate(2.5deg)"
            : count % 5 === 0
            ? "rotate(1deg)"
            : "rotate(-1.5deg)",
      }}
    >
      <p className={classes.From}>
        {count}. {selection.from}
      </p>
      <p className={classes.Submission}>
        {selection.name > 40
          ? `${selection.name.substring(0, 40)}...`
          : selection.name}
      </p>
      {isAdmin ? (
        <p className={classes.Time} style={{ opacity: showTime && 1 }}>
          {selection.time}
        </p>
      ) : (
        <div className={classes.VoteContainer}>
          <Button
            onClick={handleVote}
            style={{
              ...buttonStyles,
              color: selection.thumbsDownVoters.includes(userId)
                ? "white"
                : "black",
              marginRight: "0.25rem",
            }}
          >
            <i class="fa fa-thumbs-down"></i>
          </Button>
          <Button
            onClick={handleVote}
            style={{
              ...buttonStyles,
              color: selection.thumbsUpVoters.includes(userId)
                ? "white"
                : "black",
              marginLeft: "0.25rem",
            }}
          >
            <i class="fa fa-thumbs-up"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubmittedSelection;
