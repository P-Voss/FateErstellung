
export default function validate(choices) {
    if (choices.attributes.element === 0) {
        return false
    }
    if (choices.attributes.odo === 0) {
        return false
    }
    if (choices.attributes.luck === 0) {
        return false
    }
    if (choices.chosenClass === 1 && choices.attributes.circuit === 0) {
        return false
    }
    return true
}
