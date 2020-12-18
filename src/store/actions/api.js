import axios from "axios";

const url = "https://randomdraftleague-f6d6d-default-rtdb.firebaseio.com/.json";

export const addSelection = (newSelection) => axios.post(url, newSelection);
export const getSelections = () => axios.get(url);