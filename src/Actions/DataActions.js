
import axios from 'axios';

export const LOAD_CLASSES = 'LOAD_CLASSES'
export const CHOOSE_CLASS = 'CHOOSE_CLASS'

export function loadClasses() {
    return dispatch => {
        return axios.get(process.env.REACT_APP_CLASSES_URL)
            .then(
                response => {
                    console.log(response)
                    if (response.data.success) {
                        dispatch({type: 'CLASS_LOADED_SUCCESS', classes: response.data.classes})
                    } else {
                        dispatch({type: 'CLASS_LOADED_FAIL'});
                    }
                },
                error => {
                    console.log(error)
                    dispatch({type: 'CLASS_LOADED_FAIL'});
                }
            );
    }
}

export function pickClass(classId) {
    return dispatch => {
        dispatch ({
            type: 'PICK_CLASS',
            classId: classId
        })
        return axios.get(process.env.REACT_APP_ATTRS_URL + "/class/" + classId)
            .then(
                response => {
                    console.log(response)
                    if (response.data.success) {
                        dispatch({type: 'ATTRIBUTES_LOADED_SUCCESS', attributes: response.data.attributes})
                    } else {
                        dispatch({type: 'ATTRIBUTES_LOADED_FAIL'});
                    }
                },
                error => {
                    console.log(error)
                    dispatch({type: 'ATTRIBUTES_LOADED_FAIL'});
                }
            );
    }
}

export function pickElement(id) {
    return dispatch => {
        dispatch({type: 'PICK_ELEMENT', elementId: id})
        dispatch({type: 'POINTS'})
    }
}

export function pickOdo(id) {
    return dispatch => {
        dispatch({type: 'PICK_ODO', odoId: id})
        dispatch({type: 'POINTS'})
    }
}

export function pickLuck(id) {
    return dispatch => {
        dispatch({type: 'PICK_LUCK', luckId: id})
        dispatch({type: 'POINTS'})
    }
}
export function pickCircuit(id) {
    return dispatch => {
        dispatch({type: 'PICK_CIRCUIT', circuitId: id})
        dispatch({type: 'POINTS'})
    }
}
