import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GlobalLoader from "../UI/GlobalLoader/GlobalLoader";
import Selection from "./Selection/Selection";

import classes from "./Selections.module.css";
import { getSelections } from "../../store/actions/selections";

// import { dummySelections } from "../../dummySelections";

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

const Selections = ({ handleSelection, search, showModal, tieredView }) => {
  const [initialFetch, setInitialFetch] = useState(true);
  const token = useSelector(state => state.auth.token);
  let selections = useSelector(state => state.selections.selections);
  // let selections = dummySelections;
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialFetch) {
      setInitialFetch(false);
      dispatch(getSelections(token));
    }
  }, [dispatch, initialFetch, token]);
  const noVotes = [];
  const voted = [];
  selections.forEach(selection => {
    if (!selection.thumbsDownVoters && !selection.thumbsUpVoters) {
      noVotes.push(selection);
    } else {
      voted.push(selection);
    }
  });

  voted.sort((a, b) => b.netLikes - a.netLikes);

  let remainingSelections = [...voted];
  let groupedSelections =
    remainingSelections.length > 0
      ? sortingOrderedGroups.map(group => {
          let pickedSelections = [];
          let totalRemaining;
          let count;

          switch (group) {
            // Triple S Plus+++
            case groups[0]:
              // this group goes first.
              // idea is to find the higest rated selections with at least 15 net likes and remove those from remainingSelections and add them to pickedSelections
              // console.log(("group name: ", groups[0]));
              count = 0;

              if (remainingSelections.length > 0) {
                for (let i = 0; i < remainingSelections.length && i < 5; i++) {
                  if (
                    remainingSelections[i].netLikes !== "no-votes" &&
                    remainingSelections[i].netLikes > 15
                  ) {
                    // console.log("picked selection: ", remainingSelections[i]);
                    count++;
                  }
                }
              }

              if (count > 0) {
                // console.log("before", pickedSelections, remainingSelections);
                pickedSelections = remainingSelections.splice(0, count);
                // console.log("after", pickedSelections, remainingSelections);
              } else {
                // console.log(
                // "No selections picked",
                // pickedSelections,
                // remainingSelections
                // );
              }
              // console.log("final: ", pickedSelections, remainingSelections);
              return {
                name: group,
                selectedSelections: pickedSelections.filter(
                  selection => selection.isSelected
                ),
                notSelectedSelections: pickedSelections.filter(
                  selection => !selection.isSelected
                ),
              };
            // Highly Above Average
            case groups[1]:
              // this group goes fourth.
              // higest picks with netLikes over 15 (Triple S PLUS+++ - 1st) and netLikes between -5 and 5 (Acceptable - 3rd) are gone,
              // so take the remaining selections with netLikes greater than 0
              // since the selections are in order, it should be from the beginning of the array to the endIndex - 1
              // console.log("group name: ", groups[1]);
              const endIndex = remainingSelections.findIndex(
                selection => selection.netLikes < 0
              );
              // console.log(
              // "end index and selection: ",
              // endIndex,
              // remainingSelections[endIndex]
              // );
              if (remainingSelections.length > 0) {
                // console.log("before", pickedSelections, remainingSelections);
                pickedSelections = remainingSelections.splice(0, endIndex);
                // console.log("after", pickedSelections, remainingSelections);
              }
              // console.log("final: ", pickedSelections, ...remainingSelections);
              return {
                name: group,
                selectedSelections: pickedSelections.filter(
                  selection => selection.isSelected
                ),
                notSelectedSelections: pickedSelections.filter(
                  selection => !selection.isSelected
                ),
              };
            // Acceptable
            case groups[2]:
              // this group goes third
              // only the selections with net likes between -5 and 5 should be moved
              // find the index where next likes is first between 5 and -5
              // then count how many selections are between that startIndex and where netLikes is less than -5
              // then move those selections
              // console.log("group name: ", groups[2]);
              count = 0;
              const startIndex = remainingSelections.findIndex(
                selection => selection.netLikes <= 5 && selection.netLikes >= -5
              );
              // console.log(
              //   "start index and selection: ",
              //   startIndex,
              //   remainingSelections[startIndex]
              // );

              if (remainingSelections.length > 0) {
                for (let i = startIndex; i < remainingSelections.length; i++) {
                  if (
                    remainingSelections[i].netLikes !== "no-votes" &&
                    remainingSelections[i].netLikes >= -5
                  ) {
                    // console.log("picked selection: ", remainingSelections[i]);
                    count++;
                  }
                }
              }

              pickedSelections = remainingSelections.splice(startIndex, count);
              // console.log("final: ", pickedSelections, ...remainingSelections);
              return {
                name: group,
                selectedSelections: pickedSelections.filter(
                  selection => selection.isSelected
                ),
                notSelectedSelections: pickedSelections.filter(
                  selection => !selection.isSelected
                ),
              };
            // ...Ok
            case groups[3]:
              // this gorup goes fifth
              // lowest picks with netLikes under 10 (Oh no... - 2nd) and netLikes between -5 and 5 (Acceptable - 3rd) are gone,
              // so take the remaining selections with netLikes less than 0
              // since the selections are in order, it should be from startI to the end
              // console.log("group name: ", groups[3]);
              const startI = remainingSelections.findIndex(
                selection => selection.netLikes <= 0
              );
              pickedSelections = remainingSelections.splice(
                startI,
                remainingSelections.length - startI
              );
              // console.log("final: ", pickedSelections, remainingSelections);
              return {
                name: group,
                selectedSelections: pickedSelections.filter(
                  selection => selection.isSelected
                ),
                notSelectedSelections: pickedSelections.filter(
                  selection => !selection.isSelected
                ),
              };
            // Oh no...
            case groups[4]:
              // this group goes 2nd
              // move the selections from the end that have 10 or less votes
              // console.log(("group name: ", groups[4]));
              totalRemaining = remainingSelections.length;
              count = 0;

              for (
                let i = totalRemaining - 1;
                i > totalRemaining - 5 && i >= 0;
                i--
              ) {
                if (
                  remainingSelections.length > 0 &&
                  remainingSelections[i].netLikes !== "no-votes" &&
                  remainingSelections[i].netLikes <= -10
                ) {
                  // console.log("picked selection: ", remainingSelections[i]);
                  count++;
                }
              }
              pickedSelections = remainingSelections.splice(
                remainingSelections.length - count - 1
              );
              // console.log("final: ", pickedSelections, ...remainingSelections);
              return {
                name: group,
                selectedSelections: pickedSelections.filter(
                  selection => selection.isSelected
                ),
                notSelectedSelections: pickedSelections.filter(
                  selection => !selection.isSelected
                ),
              };
            // Untouchables
            default:
              // this group goes last
              // this group has no votes, so just sort the noVotes array
              // console.log("group name: ", groups[5]);
              // console.log("final: ", pickedSelections, remainingSelections);
              return {
                name: group,
                selectedSelections: noVotes.filter(
                  selection => selection.isSelected
                ),
                notSelectedSelections: noVotes.filter(
                  selection => !selection.isSelected
                ),
              };
          }
        })
      : [];

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
      {selections.length === 0 ? (
        <GlobalLoader />
      ) : !tieredView ? (
        selections.map(selection => (
          <div
            className={classes.Selection}
            key={selection.id}
            onClick={() => handleSelection(selection.id)}
            style={{ flexGrow: 1 }}
          >
            <Selection selectionData={selection} showModal={showModal} />
          </div>
        ))
      ) : (
        <div>
          {groups.map((group, index) => {
            const currentGroup = groupedSelections.find(g => g.name === group);

            return (
              <div
                key={group}
                className={classes.Group}
                style={{
                  marginBottom: index === groups.length - 1 ? 0 : "2rem",
                }}
              >
                <h3 className={classes.GroupTitle}>{group}</h3>
                <div className={classes.Divider}></div>
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
