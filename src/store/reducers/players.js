import * as actionTypes from "../actions/actionTypes";

const initialState = {
    players: [],
    setPlayerId: null
}

export default (state = initialState, action) => {
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
                players: state.players.map(player => player.playerId === action.payload.playerId ? action.payload : player)
            };
        case actionTypes.REMOVE_PLAYER:
            return {
                ...state,
                players: state.players.filter(player => player.playerId !== action.payload)
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
            }
        default:
            return state;
    }
}