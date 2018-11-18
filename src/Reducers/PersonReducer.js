import {
    CHANGE_BIRTHDATE, CHANGE_EYECOLOR,
    CHANGE_FIRSTNAME,
    CHANGE_GENDER,
    CHANGE_PREFERENCE, CHANGE_RESIDENCE, CHANGE_SIZE,
    CHANGE_SURNAME
} from "../Actions/PersonActions"

export default function PersonReducer(state = {}, action) {

    switch (action.type) {

        case CHANGE_GENDER:
            return {...state, gender: action.value}
        case CHANGE_PREFERENCE:
            return {...state, preference: action.value}
        case CHANGE_BIRTHDATE:
            return {...state, dateOfBirth: action.value}
        case CHANGE_FIRSTNAME:
            return {...state, firstname: action.value}
        case CHANGE_SURNAME:
            return {...state, surname: action.value}
        case CHANGE_SIZE:
            return {...state, size: action.value}
        case CHANGE_EYECOLOR:
            return {...state, eyeColor: action.value}
        case CHANGE_RESIDENCE:
            return {...state, residence: action.value}

        default:
            return state;
    }
}
