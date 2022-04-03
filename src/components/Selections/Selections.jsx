import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import Button from "../UI/Button/Button";
import GlobalLoader from "../UI/GlobalLoader/GlobalLoader";
import SearchBar from "../UI/SearchBar/SearchBar";
import Selection from "./Selection/Selection";

import classes from "./Selections.module.css";
import { getSelections } from "../../store/actions/selections";

const groups = [
  "Triple S Plus+++",
  "Highly Above Average",
  "Acceptable",
  "...Ok",
  "Oh no...",
  "Untouchables",
];
const sortingOrderedGroups = [
  "Triple S Plus+++",
  "Oh no...",
  "Acceptable",
  "Highly Above Average",
  "...Ok",
  "Untouchables",
];
const buttonStyles = {
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  height: "1.75rem",
  justifyContent: "center",
  position: "initial",
  width: "1.75rem",
};

const Selections = ({ showModal, handleSelection }) => {
  const [search, setSearch] = useState("");
  const [tieredView, setTieredView] = useState(false);
  const token = useSelector(state => state.auth.token);
  let selections = useSelector(state => state.selections.selections);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selections.length === 0) {
      dispatch(getSelections(token));
    }
  }, [dispatch, selections, token]);

  const noVotes = [];
  const voted = [];
  selections = selections.map(selection => ({
    ...selection,
    netLikes:
      selection.thumbsUpVoters.length === 0 &&
      selection.thumbsDownVoters.length === 0
        ? "no-votes"
        : selection.thumbsUpVoters.length - selection.thumbsDownVoters.length,
  }));
  selections.forEach(selection => {
    if (selection.netLikes === "no-votes") {
      noVotes.push(selection);
    } else {
      voted.push(selection);
    }
  });

  voted.sort((a, b) => a.netLikes - b.netLikes);
  console.log(selections, noVotes, voted);

  const remainingSelections = voted.filter(
    selection => selection.netLikes >= 5 && selection.netLikes <= -5
  );
  let groupedSelections = sortingOrderedGroups.map(group => {
    let pickedSelections;

    switch (group) {
      case groups[0]:
        pickedSelections = remainingSelections.splice(0, 5);
        return {
          name: group,
          selectedSelections: pickedSelections.filter(
            selection => selection.isSelected
          ),
          notSelectedSelections: pickedSelections.filter(
            selection => !selection.isSelected
          ),
        };
      case groups[1]:
        const endIndex = remainingSelections.findIndex(
          selection => selection.netLikes < 0
        );
        pickedSelections = remainingSelections.splice(0, endIndex - 1);
        return {
          name: group,
          selectedSelections: pickedSelections.filter(
            selection => selection.isSelected
          ),
          notSelectedSelections: pickedSelections.filter(
            selection => !selection.isSelected
          ),
        };
      case groups[2]:
        return {
          name: group,
          selectedSelections: voted.filter(
            selection =>
              selection.netLikes <= 5 &&
              selection.netLikes >= -5 &&
              selection.isSelected
          ),
          notSelectedSelections: voted.filter(
            selection =>
              selection.netLikes <= 5 &&
              selection.netLikes >= -5 &&
              !selection.isSelected
          ),
        };
      case groups[3]:
        return {
          name: group,
          selectedSelections: remainingSelections.filter(
            selection => selection.isSelected
          ),
          notSelectedSelections: remainingSelections.filter(
            selection => !selection.isSelected
          ),
        };
      case groups[4]:
        pickedSelections = remainingSelections.splice(-5);
        return {
          name: group,
          selectedSelections: pickedSelections.filter(
            selection => selection.isSelected
          ),
          notSelectedSelections: pickedSelections.filter(
            selection => !selection.isSelected
          ),
        };
      default:
        return {
          name: group,
          selectedSelections: noVotes.filter(selection => selection.isSelected),
          notSelectedSelections: noVotes.filter(
            selection => !selection.isSelected
          ),
        };
    }
  });

  const selectedSelections = selections.filter(
    selection => selection.isSelected
  );
  const notSelectedSelections = selections.filter(
    selection => !selection.isSelected
  );
  selectedSelections.sort((a, b) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
  notSelectedSelections.sort((a, b) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
  selections = notSelectedSelections.concat(selectedSelections);

  groupedSelections.forEach(group => {
    group.selectedSelections.sort((a, b) => {
      return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    });
    group.notSelectedSelections.sort((a, b) => {
      return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    });
    group.selections = group.notSelectedSelections.concat(
      group.selectedSelections
    );
  });

  // if a user has typed something in the search bar, filter through the selections and return the results
  if (search.length > 0) {
    if (tieredView) {
      groupedSelections.forEach(group => {
        group.selections = group.selections.filter(selection =>
          selection.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    } else {
      selections = selections.filter(selection =>
        selection.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  return (
    <div className={classes.Selections}>
      <div className={classes.Toolbar}>
        <SearchBar search={search} setSearch={setSearch} />
        <div>
          <Button onClick={() => setTieredView(true)} style={buttonStyles}>
            <AlignHorizontalLeftIcon
              style={{ marginRight: "1rem", transform: "rotateX(180deg)" }}
            />
          </Button>
          <Button onClick={() => setTieredView(false)} style={buttonStyles}>
            <ViewModuleIcon />
          </Button>
        </div>
      </div>
      {selections.length === 0 ? (
        <GlobalLoader />
      ) : !tieredView ? (
        selections.map(selection => (
          <div
            className={classes.Selection}
            key={selection.id}
            onClick={() => handleSelection(selection.id)}
          >
            <Selection selectionData={selection} showModal={showModal} />
          </div>
        ))
      ) : (
        <div>
          {groups.map(group => {
            const currentGroup = groupedSelections.find(g => g.name === group);

            return (
              <div key={group} className={classes.Group}>
                <h2 className={classes.GroupTitle}>{group}</h2>
                <div className={classes.GroupSelections}>
                  {currentGroup.selections.map(selection => (
                    <div
                      key={selection.id}
                      className={classes.Selection}
                      onClick={() => handleSelection(selection.id)}
                    >
                      <Selection
                        selectionData={selection}
                        showModal={showModal}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selections;
