import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const getRounds = (token) => async(dispatch) => {
    try {
        const {data} = await api.getRounds(token);

        dispatch({type: actionTypes.GET_ROUNDS, payload: data});
    } catch(err) {
        console.log(err);
    }
};

export const setRounds = (rounds, token) => async(dispatch) => {
    try {
        await api.setRounds(rounds, token);

        dispatch({type: actionTypes.SET_ROUNDS, payload: rounds});
    } catch(err) {
        console.log(err);
    }
};