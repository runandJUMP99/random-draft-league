import axios from "axios";

const url = "https://randomdraftleague-f6d6d-default-rtdb.firebaseio.com/";

export const addSelection = (newSelection) => axios.post(`${url}.json`, newSelection);
export const getSelections = () => axios.get(`${url}.json`);
export const editSelection = (id, updatedSelection) => axios.patch(`${url}/${id}.json`, updatedSelection);
export const deleteSelection = (id) => axios.delete(`${url}/${id}.json`);

export const addToChart = (newAddition) => axios.post(`${url}/chart.json`, newAddition);
export const getChart = () => axios.get(`${url}/chart.json`);
export const removeFromChart = (id) => axios.delete(`${url}/chart/${id}.json`);

export const addPlayer = (player) => axios.post(`${url}/players.json`, player);
export const getPlayers = () => axios.get(`${url}/players.json`);
export const removePlayer = (id) => axios.delete(`${url}/players/${id}.json`);