import * as actionTypes from "../actions/actionTypes";

export default (players = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_PLAYER:
            return [...players, action.payload];
        case actionTypes.GET_PLAYERS:
            return action.payload;
        case actionTypes.REMOVE_PLAYER:
            return players.filter(player => player.id !== action.payload);
        case actionTypes.CLEAR_PLAYERS:
            return [];
        default:
            return players;
    }
}