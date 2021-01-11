import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const getRounds = () => async(dispatch) => {
    try {
        const {data} = await api.getRounds();

        dispatch({type: actionTypes.GET_ROUNDS, payload: data});
    } catch(err) {
        console.log(err);
    }
};

export const setRounds = (rounds, token) => async(dispatch) => {
    try {
        const {data} = await api.setRounds(rounds, token);
        const setRounds = {
            ...rounds,
            id: data.name,                
        };

        dispatch({type: actionTypes.SET_ROUNDS, payload: setRounds});
    } catch(err) {
        console.log(err);
    }
};