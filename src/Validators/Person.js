
 export default function validate(person) {
    if (person.firstname === "") {
        return false
    }
    if (person.surname === "") {
        return false
    }
    if (person.eyeColor === "") {
        return false
    }
    if (person.size === "") {
        return false
    }
    if (person.preference === "") {
        return false
    }
    if (person.residence === "") {
        return false
    }
    return true
}
