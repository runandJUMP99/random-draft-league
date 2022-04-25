import { useSelector } from "react-redux";

import AddSelection from "../../AddSelection/AddSelection";
import SubmittedSelection from "./SubmittedSelection/SubmittedSelection";
import GlobalLoader from "../../UI/GlobalLoader/GlobalLoader";

import classes from "./SubmittedSelections.module.css";

const SubmittedSelections = ({
  setModalContent,
  setShowModal,
  submittedSelections,
}) => {
  // filter out any blank submissions
  const filteredSubmittedSelections = submittedSelections.filter(
    selection => selection.name
  );
  const selectedSelections = filteredSubmittedSelections.filter(
    selection => selection.isSelected
  );
  const notSelectedSelections = filteredSubmittedSelections.filter(
    selection => !selection.isSelected
  );
  const isAdmin = useSelector(
    state => state.auth.userId === process.env.REACT_APP_FIREBASE_UID1,
    state => state.auth.userId === process.env.REACT_APP_FIREBASE_UID2
  );
  let count = 0;

  selectedSelections.sort((a, b) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });

  notSelectedSelections.sort((a, b) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });

  submittedSelections = notSelectedSelections.concat(selectedSelections);

  function handleClick(id) {
    const selectedSubmission = submittedSelections.find(
      selection => selection.id === id
    );
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (!selectedSubmission.isSelected && isAdmin) {
      setModalContent(
        <AddSelection
          setShowModal={setShowModal}
          submittedSelection={selectedSubmission}
        />
      );
    } else {
      setModalContent(
        <div>
          <h4>{selectedSubmission.name}</h4>
          <p>-{selectedSubmission.from}</p>
        </div>
      );
    }

    if (width > 800 || isAdmin) {
      setShowModal(true);
    }
  }

  return (
    <div className={classes.SubmittedSelections}>
      {submittedSelections.length === 0 ? (
        <GlobalLoader />
      ) : (
        submittedSelections.map(submittedSelection => {
          count++;
          return (
            <SubmittedSelection
              key={submittedSelection.id}
              count={count}
              onClick={handleClick}
              selection={submittedSelection}
            />
          );
        })
      )}
    </div>
  );
};

export default SubmittedSelections;
