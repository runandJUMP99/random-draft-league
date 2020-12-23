import * as actionTypes from "../actions/actionTypes";
import * as api from "./api";

export const addToChart = (selection) => async(dispatch) => {
    try {
        const {data} = await api.addToChart(selection);
        
        const newSelection = {
            ...selection,
            chartId: data.name
        }
        
        dispatch({type: actionTypes.ADD_TO_CHART, payload: newSelection});
    } catch(err) {
        console.log(err);
    }
};

export const getChart = () => async(dispatch) => {
    try {
        const fetchedChart = [];
        const {data} = await api.getChart();

        for (let key in data) {
            fetchedChart.push({
                ...data[key],
                chartId: key
            });
        }
        
        dispatch({type: actionTypes.GET_CHART, payload: fetchedChart});
    } catch(err) {
        console.log(err);
    }
};

export const removeFromChart = (id) => (dispatch) => {
    try {
        api.removeFromChart(id);

        dispatch({type: actionTypes.REMOVE_FROM_CHART, payload: id});
    } catch(err) {
        console.log(err);
    }
};

export const clearChart = (selections) => (dispatch) => {
    try {
        selections.forEach(selection => {
            api.removeFromChart(selection.chartId);
        });

        dispatch({type: actionTypes.CLEAR_CHART});
    } catch(err) {
        console.log(err);
    }
};