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
            let firstname = action.value.charAt(0).toUpperCase() + action.value.slice(1)
            return {...state, firstname: firstname.trim()}
        case CHANGE_SURNAME:
            let surname = action.value.charAt(0).toUpperCase() + action.value.slice(1)
            return {...state, surname: surname.trim()}
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
