
export default function validate(choices, creationPoints) {
    return choices.subclass > 0 && creationPoints >= 0
}
