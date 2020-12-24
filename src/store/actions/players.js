import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addPlayer = (player) => async(dispatch) => {
    try {
        const {data} = await api.addPlayer(player);

        const newPlayer = {
            ...player,
            playerId: data.name
        }
        
        dispatch({type: actionTypes.ADD_PLAYER, payload: newPlayer});
    } catch(err) {
        console.log(err);
    }
};

export const getPlayers = () => async(dispatch) => {
    try {
        const fetchedPlayers = [];
        const {data} = await api.getPlayers();

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

export const removePlayer = (id) => (dispatch) => {
    try {
        api.removePlayer(id);

        dispatch({type: actionTypes.REMOVE_PLAYER, payload: id});
    } catch(err) {
        console.log(err);
    }
};

export const clearPlayers = (players) => (dispatch) => {
    try {
        players.forEach(player => {
            api.removePlayer(player.playerId);
        });

        dispatch({type: actionTypes.CLEAR_PLAYERS});
    } catch(err) {
        console.log(err);
    }
};