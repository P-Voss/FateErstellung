
import axios from 'axios';

export const LOAD_CLASSES = 'LOAD_CLASSES'
export const CHOOSE_CLASS = 'CHOOSE_CLASS'

export function loadPlaces() {
    return dispatch => {
        return axios.get(process.env.REACT_APP_MAP_PLACES_DATA_URL)
            .then(
                response => {
                    if (response.data.success) {
                        dispatch({type: 'PLACES_LOADED_SUCCESS', districts: response.data.districts, attractions: response.data.attractions})
                    } else {
                        dispatch({type: 'PLACES_LOADED_FAIL'});
                    }
                },
                error => {
                    console.log(error)
                    dispatch({type: 'PLACES_LOADED_FAIL'});
                }
            );
    }
}

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

export function loadSubclasses(choices) {
    return dispatch => {
        const data = new FormData();
        data.append('circuit', choices.attributes.circuit);
        data.append('luck', choices.attributes.luck);
        data.append('odo', choices.attributes.odo);
        data.append('element', choices.attributes.element);
        data.append('traits', choices.traits);
        data.append('class', choices.chosenClass);
        return axios.post(process.env.REACT_APP_SUBCLASSES_URL,
            data,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(
                response => {
                    console.log(response)
                    if (response.data.success) {
                        dispatch({type: 'SUBCLASS_LOADED_SUCCESS', subclasses: response.data.subclasses})
                    } else {
                        dispatch({type: 'SUBCLASS_LOADED_FAIL'});
                    }
                },
                error => {
                    console.log(error)
                    dispatch({type: 'SUBCLASS_LOADED_FAIL'});
                }
            );
    }
}

export function loadTraits() {
    return dispatch => {
        return axios.get(process.env.REACT_APP_TRAITS_URL)
            .then(
                response => {
                    console.log(response)
                    if (response.data.success) {
                        dispatch({type: 'TRAITS_LOADED_SUCCESS', traits: response.data.traits})
                    } else {
                        dispatch({type: 'TRAITS_LOADED_FAIL'});
                    }
                }
            )
            .catch(
                error => {
                    console.log(error)
                    dispatch({type: 'TRAITS_LOADED_FAIL'});
                }
            )
    }
}

export function loadAttributes() {
    return dispatch => {
        return axios.get(process.env.REACT_APP_ATTRS_URL)
            .then(
                response => {
                    if (response.data.success) {
                        dispatch({type: 'ATTRIBUTES_LOADED_SUCCESS', attributes: response.data.attributes})
                    } else {
                        dispatch({type: 'ATTRIBUTES_LOADED_FAIL'});
                    }
                    dispatch({type: 'POINTS'})
                },
                error => {
                    dispatch({type: 'POINTS'})
                    dispatch({type: 'ATTRIBUTES_LOADED_FAIL'});
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
        dispatch({type: 'POINTS'})
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

export function pickTrait(traitId) {
    return dispatch => {
        dispatch({type: 'PICK_TRAIT', id: traitId})
        dispatch({type: 'POINTS'})
    }
}

export function removeTrait(traitId) {
    return dispatch => {
        dispatch({type: 'REMOVE_TRAIT', id: traitId})
        dispatch({type: 'POINTS'})
    }
}

export function pickSubclass(classId) {
    return dispatch => {
        dispatch({type: 'PICK_SUBCLASS', id: classId})
        dispatch({type: 'POINTS'})
    }
}

export function removeSubclass() {
    return dispatch => {
        dispatch({type: 'REMOVE_SUBCLASS'})
        dispatch({type: 'POINTS'})
    }
}
