import axios from "axios";

const url = "https://randomdraftleague-f6d6d-default-rtdb.firebaseio.com/";
const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.REACT_APP_FIREBASE_KEY;


export const addSelection = (newSelection, token) => axios.post(`${url}.json?auth=${token}`, newSelection);
export const getSelections = () => axios.get(`${url}.json`);
export const editSelection = (id, updatedSelection, token) => axios.patch(`${url}/${id}.json?auth=${token}`, updatedSelection);
export const deleteSelection = (id, token) => axios.delete(`${url}/${id}.json?auth=${token}`);

export const addToChart = (newAddition, token) => axios.post(`${url}/chart.json?auth=${token}`, newAddition);
export const getChart = () => axios.get(`${url}/chart.json`);
export const removeFromChart = (id, token) => axios.delete(`${url}/chart/${id}.json?auth=${token}`);
export const setRounds = (rounds, token) => axios.post(`${url}/chart/rounds.json?auth=${token}`, rounds);
export const getRounds = () => axios.get(`${url}/chart/rounds.json`);

export const addPlayer = (player, token) => axios.post(`${url}/players.json?auth=${token}`, player);
export const getPlayers = () => axios.get(`${url}/players.json`);
export const editPlayer = (id, updatedPlayer, token) => axios.patch(`${url}/players/${id}.json?auth=${token}`, updatedPlayer);
export const removePlayer = (id, token) => axios.delete(`${url}/players/${id}.json?auth=${token}`);

export const auth = (authData) => axios.post(authUrl, authData);

export const addSubmittedSelection = (newSelection) => axios.post(`${url}/submittedselections.json`, newSelection);
export const getSubmittedSelections = () => axios.get(`${url}/submittedselections.json`);
export const editSubmittedSelection = (id, updatedSelection, token) => axios.patch(`${url}/submittedselections/${id}.json?auth=${token}`, updatedSelection);
export const deleteSubmittedSelection = (id, token) => axios.delete(`${url}/submittedselections/${id}.json?auth=${token}`);

export const addSelectionSubject = (subject, token) => axios.post(`${url}/subject.json?auth=${token}`, subject);
export const getSelectionSubject = () => axios.get(`${url}/subject.json`);
export const setSelectionSubject = (id, subject, token) => axios.patch(`${url}/subject/${id}.json?auth=${token}`, subject);