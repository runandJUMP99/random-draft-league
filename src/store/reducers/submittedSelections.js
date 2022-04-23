import * as actionTypes from "../actions/actionTypes";

const submittedSelections = (submittedSelections = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_SUBMITTED_SELECTION:
      return [...submittedSelections, action.payload];
    case actionTypes.GET_SUBMITTED_SELECTIONS:
      return action.payload;
    case actionTypes.EDIT_SUBMITTED_SELECTION:
      return submittedSelections.map(selection =>
        selection.id === action.payload.id
          ? { ...selection, ...action.payload.data }
          : selection
      );
    case actionTypes.DELETE_SUBMITTED_SELECTION:
      return submittedSelections.filter(
        selection => selection.id !== action.payload
      );
    case actionTypes.CLEAR_SUBMITTED_SELECTIONS:
      return [];
    default:
      return submittedSelections;
  }
};

export default submittedSelections;
