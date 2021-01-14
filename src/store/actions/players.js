import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addPlayer = (player, token) => async(dispatch) => {
    try {
        const {data} = await api.addPlayer(player, token);

        const newPlayer = {
            ...player,
            playerId: data.name
        }
        
        dispatch({type: actionTypes.ADD_PLAYER, payload: newPlayer});
    } catch(err) {
        console.log(err);
    }
};

export const getPlayers = (token) => async(dispatch) => {
    try {
        const fetchedPlayers = [];
        const {data} = await api.getPlayers(token);

        for (let key in data) {
            fetchedPlayers.push({
                ...data[key],
                playerId: key
            });
        }
        
        dispatch({type: actionTypes.GET_PLAYERS, payload: fetchedPlayers});
    } catch(err) {
        console.log(err);
    }
};

export const editPlayer = (id, player, token) => async(dispatch) => {
    try {
        const {data} = await api.editPlayer(id, player, token);

        dispatch({type: actionTypes.EDIT_PLAYER, payload: data});
    } catch(err) {
        console.log(err);
    }
};

export const removePlayer = (id, token) => (dispatch) => {
    try {
        api.removePlayer(id, token);

        dispatch({type: actionTypes.REMOVE_PLAYER, payload: id});
    } catch(err) {
        console.log(err);
    }
};

export const clearPlayers = (players, token) => (dispatch) => {
    try {
        players.forEach(player => {
            api.removePlayer(player.playerId, token);
        });

        dispatch({type: actionTypes.CLEAR_PLAYERS});
    } catch(err) {
        console.log(err);
    }
};

export const setPlayerId = (id) => (dispatch) => {
    try {
        dispatch({type: actionTypes.SET_PLAYER_ID, payload: id});
    } catch(err) {
        console.log(err);
    }
}