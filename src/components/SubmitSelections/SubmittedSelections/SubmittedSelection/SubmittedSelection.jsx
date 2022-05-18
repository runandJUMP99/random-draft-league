import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";

import Button from "../../../UI/Button/Button";

import classes from "./SubmittedSelection.module.css";
import {
  deleteSubmittedSelection,
  editSubmittedSelection,
} from "../../../../store/actions/submittedSelections";

const buttonStyles = {
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.125)",
  display: "flex",
  height: "1.75rem",
  justifyContent: "center",
  position: "initial",
  width: "1.75rem",
};

const SubmittedSelection = ({ count, onClick, selection, styles }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const isAdmin =
    userId === process.env.REACT_APP_FIREBASE_UID1 ||
    userId === process.env.REACT_APP_FIREBASE_UID2;
  const dispatch = useDispatch();

  function handleClick() {
    onClick(selection.id);
  }

  function handleMouseEnter() {
    setShowControls(true);
    setIsOver(true);
  }

  function handleMouseLeave() {
    setShowControls(false);
    setIsOver(false);
  }

  function handleDelete() {
    setIsDeleted(true);

    setTimeout(() => {
      dispatch(deleteSubmittedSelection(selection.id, token));
    }, 1000);
  }

  function handleVote(vote) {
    const updatedSelection = {
      ...(vote === "up"
        ? {
            thumbsDownVoters: selection.thumbsDownVoters
              ? selection.thumbsDownVoters.includes(userId)
                ? selection.thumbsDownVoters.filter(voter => voter !== userId)
                : selection.thumbsDownVoters
              : null,
            thumbsUpVoters: selection.thumbsUpVoters
              ? selection.thumbsUpVoters.includes(userId)
                ? selection.thumbsUpVoters.filter(voter => voter !== userId)
                : [...selection.thumbsUpVoters, userId]
              : [userId],
            netLikes: !selection.netLikes
              ? 1
              : selection.thumbsUpVoters &&
                selection.thumbsUpVoters.includes(userId)
              ? selection.netLikes - 1
              : selection.thumbsDownVoters &&
                selection.thumbsDownVoters.includes(userId)
              ? selection.netLikes + 2
              : selection.netLikes + 1,
          }
        : {
            thumbsDownVoters: selection.thumbsDownVoters
              ? selection.thumbsDownVoters.includes(userId)
                ? selection.thumbsDownVoters.filter(voter => voter !== userId)
                : [...selection.thumbsDownVoters, userId]
              : [userId],
            thumbsUpVoters: selection.thumbsUpVoters
              ? selection.thumbsUpVoters.includes(userId)
                ? selection.thumbsUpVoters.filter(voter => voter !== userId)
                : selection.thumbsUpVoters
              : null,
            netLikes: !selection.netLikes
              ? -1
              : selection.thumbsDownVoters &&
                selection.thumbsDownVoters.includes(userId)
              ? selection.netLikes + 1
              : selection.thumbsUpVoters &&
                selection.thumbsUpVoters.includes(userId)
              ? selection.netLikes - 2
              : selection.netLikes - 1,
          }),
    };
    dispatch(editSubmittedSelection(selection.id, updatedSelection, token));
  }

  return (
    <div
      className={classes.SubmittedSelectionContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: isDeleted ? 0 : 1,
        transform: isDeleted
          ? "translateY(100px)"
          : isOver
          ? "scale(1.25)"
          : "",
        zIndex: isOver && 5,
      }}
    >
      {selection.userId === userId && (
        <button
          className={classes.Delete}
          onClick={() => handleDelete(selection.id)}
          style={{ opacity: showControls ? 1 : 0 }}
        >
          <CloseIcon />
        </button>
      )}
      <div
        className={classes.SubmittedSelection}
        onClick={handleClick}
        style={{
          ...styles,
          background: count % 2 === 0 ? "lightblue" : "lightgreen",
          boxShadow: selection.isSelected && "0 0 0 0",
          cursor: selection.isSelected && "initial",
          opacity: selection.isSelected && 0.6,
          transform: isOver
            ? "rotate(0)"
            : count % 3 === 0
            ? "rotate(1deg)"
            : count % 5 === 0
            ? "rotate(3.5deg)"
            : count % 2 === 0
            ? "rotate(-3deg)"
            : "rotate(-2deg)",
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
        {isAdmin && (
          <p className={classes.Time} style={{ opacity: showControls && 1 }}>
            {selection.time}
          </p>
        )}
      </div>
      {token && selection.userId !== userId && !selection.isSelected && (
        <div
          className={classes.VoteContainer}
          style={{ opacity: showControls ? 1 : 0 }}
        >
          <Button
            onClick={() => handleVote("down")}
            style={{
              ...buttonStyles,
              color:
                selection.thumbsDownVoters &&
                selection.thumbsDownVoters.includes(userId)
                  ? "white"
                  : "black",
              marginRight: "0.25rem",
            }}
          >
            <i className="fa fa-thumbs-down"></i>
          </Button>
          <Button
            onClick={() => handleVote("up")}
            style={{
              ...buttonStyles,
              color:
                selection.thumbsUpVoters &&
                selection.thumbsUpVoters.includes(userId)
                  ? "white"
                  : "black",
              marginLeft: "0.25rem",
            }}
          >
            <i className="fa fa-thumbs-up"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubmittedSelection;
