import * as actionTypes from "../actions/actionTypes";

const initialState = {
    selections: [],
    setSelectionId: null,
    subject: null
}

const selections = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case actionTypes.ADD_SELECTION:
            return {
                ...state,
                selections: [...state.selections, action.payload]
            }; 
        case actionTypes.GET_SELECTIONS:
            return {
                ...state,
                selections: action.payload
            };
        case actionTypes.EDIT_SELECTION:
            return {
                ...state,
                selections: state.selections.map(selection => {
                    return selection.id === action.payload.id ? action.payload : selection;
                })
            };
        case actionTypes.DELETE_SELECTION:
            return {
                ...state,
                selections: state.selections.filter(selection => selection.id !== action.payload)
            };   
        case actionTypes.DELETE_SELECTIONS:
            return {
                selections: [],
                setSelectionId: null
            };   
        case actionTypes.SET_SELECTION_ID:
            return {
                ...state,
                setSelectionId: action.payload
            };
        case actionTypes.SET_SELECTION_SUBJECT:
            return {
                ...state,
                subject: action.payload
            };
        default:
            return state;
    }
};

export default selections;