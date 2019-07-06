import axios from "axios"

export const START = 'START'
export const REQUEST_CREATION = 'REQUEST_CREATION'
export const CREATION_SUCCESS = 'CREATION_SUCCESS'
export const CREATION_FAILURE = 'CREATION_FAILURE'
export const CONFIRM_ERROR = 'CONFIRM_ERROR'

export function startCreation() {
    return ({
        type: START
    })
}

export function confirmError() {
    return ({
        type: CONFIRM_ERROR
    })
}

export function createCharacter(person = {}, choices = {}, subclasses = []) {
    return dispatch => {
        dispatch(requestCreation())

        const data = new FormData();

        data.append('firstname', person.firstname)
        data.append('surname', getSurname(person.surname, choices.subclass, subclasses))
        data.append('gender', person.gender)
        data.append('dateOfBirth', person.dateOfBirth)
        data.append('eyeColor', person.eyeColor)
        data.append('size', person.size)
        data.append('preference', person.preference)
        data.append('residence', person.residence)

        data.append('circuit', choices.attributes.circuit);
        data.append('luck', choices.attributes.luck);
        data.append('odo', choices.attributes.odo);
        data.append('element', choices.attributes.element);
        data.append('traits', choices.traits);
        data.append('class', choices.chosenClass);
        data.append('subclass', choices.subclass);

        return axios.post(process.env.REACT_APP_CREATION_URL,
            data,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(
                response => {
                    if (response.data.success) {
                        window.location.replace(process.env.REACT_APP_EXIT_URL)
                    } else {
                        dispatch({
                            type: CREATION_FAILURE,
                            errormessage: response.data.error
                        });
                    }
                },
                error => {
                    dispatch({
                        type: CREATION_FAILURE,
                        errormessage: 'Technischer Fehler, sorry! Sag bitte einem Admin Bescheid.'
                    });
                }
            );
    }
}

function getSurname(surname, chosenSubclass, classes = []) {
    let result = surname
    classes.forEach(subclass => {
        if (subclass.id === chosenSubclass && subclass.familienname !== null) {
            result = subclass.familienname
        }
    })
    return result
}

function requestCreation() {
    return {
        type: REQUEST_CREATION
    }
}