import * as actionTypes from "../actions/actionTypes";

const initialState = {
    players: [],
    setPlayerId: null
}

const players = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, action.payload]
            };
        case actionTypes.GET_PLAYERS:
            return {
                ...state,
                players: action.payload
            };
        case actionTypes.EDIT_PLAYER:
            return {
                ...state,
                players: state.players.map(player => player.userId === action.payload.userId ? action.payload : player)
            };
        case actionTypes.REMOVE_PLAYER:
            return {
                ...state,
                players: state.players.filter(player => player.userId !== action.payload)
            };
        case actionTypes.CLEAR_PLAYERS:
            return {
                ...state,
                players: []
            };
        case actionTypes.SET_PLAYER_ID:
            return {
                ...state,
                setPlayerId: action.payload
            };
        default:
            return state;
    }
};

export default players;