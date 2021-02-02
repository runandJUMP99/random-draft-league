import axios from "axios";

const url = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const addSelection = (newSelection, token) => axios.post(`${url}.json?auth=${token}`, newSelection);
export const getSelections = (token) => axios.get(`${url}.json?auth=${token}`);
export const editSelection = (id, updatedSelection, token) => axios.patch(`${url}/${id}.json?auth=${token}`, updatedSelection);
export const deleteSelection = (id, token) => axios.delete(`${url}/${id}.json?auth=${token}`);

export const setRounds = (rounds, token) => axios.put(`${url}/chart/rounds.json?auth=${token}`, rounds);
export const getRounds = (token) => axios.get(`${url}/chart/rounds.json?auth=${token}`);

export const addPlayer = (player, token) => axios.post(`${url}/players.json?auth=${token}`, player);
export const getPlayers = (token) => axios.get(`${url}/players.json?auth=${token}`);
export const editPlayer = (id, updatedPlayer, token) => axios.patch(`${url}/players/${id}.json?auth=${token}`, updatedPlayer);
export const removePlayer = (id, token) => axios.delete(`${url}/players/${id}.json?auth=${token}`);

export const addSubmittedSelection = (newSelection) => axios.post(`${url}/submittedselections.json`, newSelection);
export const getSubmittedSelections = () => axios.get(`${url}/submittedselections.json`);
export const editSubmittedSelection = (id, updatedSelection, token) => axios.patch(`${url}/submittedselections/${id}.json?auth=${token}`, updatedSelection);
export const deleteSubmittedSelection = (id, token) => axios.delete(`${url}/submittedselections/${id}.json?auth=${token}`);

export const addSelectionSubject = (subject, token) => axios.post(`${url}/subject.json?auth=${token}`, subject);
export const getSelectionSubject = () => axios.get(`${url}/subject.json`);
export const setSelectionSubject = (id, subject, token) => axios.patch(`${url}/subject/${id}.json?auth=${token}`, subject);