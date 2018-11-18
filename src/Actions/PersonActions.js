
export const CHANGE_GENDER = 'CHANGE_GENDER'
export const CHANGE_PREFERENCE = 'CHANGE_PREFERENCE'
export const CHANGE_FIRSTNAME = 'CHANGE_FIRSTNAME'
export const CHANGE_SURNAME = 'CHANGE_SURNAME'
export const CHANGE_EYECOLOR = 'CHANGE_EYECOLOR'
export const CHANGE_SIZE = 'CHANGE_SIZE'
export const CHANGE_RESIDENCE = 'CHANGE_RESIDENCE'
export const CHANGE_BIRTHDATE = 'CHANGE_BIRTHDATE'

export function changeGender(gender) {
    return ({
        type: CHANGE_GENDER,
        value: gender
    })
}

export function changePreference(preference) {
    return ({
        type: CHANGE_PREFERENCE,
        value: preference
    })
}

export function changeFirstname(name) {
    return ({
        type: CHANGE_FIRSTNAME,
        value: name
    })
}

export function changeSurname(name) {
    return ({
        type: CHANGE_SURNAME,
        value: name
    })
}

export function changeEyecolor(color) {
    return ({
        type: CHANGE_EYECOLOR,
        value: color
    })
}

export function changeSize(size) {
    return ({
        type: CHANGE_SIZE,
        value: size
    })
}

export function changeResidence(place) {
    return ({
        type: CHANGE_RESIDENCE,
        value: place
    })
}

export function changeBirthdate(date) {
    return ({
        type: CHANGE_BIRTHDATE,
        value: date
    })
}
