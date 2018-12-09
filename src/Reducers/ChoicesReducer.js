
export default function choices(state = {}, action) {
    switch (action.type) {
        case 'PICK_CLASS':
            if (action.classId === 5) {
                return {...state, chosenClass: action.classId}
            } else {
                return {...state, attributes: {...state.attributes, circuit: 0}, chosenClass: action.classId}
            }
        case 'PICK_ELEMENT':
            return {...state, attributes: {...state.attributes, element: action.elementId}}
        case 'PICK_ODO':
            return {...state, attributes: {...state.attributes, odo: action.odoId}}
        case 'PICK_LUCK':
            return {...state, attributes: {...state.attributes, luck: action.luckId}}
        case 'PICK_CIRCUIT':
            return {...state, attributes: {...state.attributes, circuit: action.circuitId}}
        case 'PICK_TRAIT':
            return {...state, traits: [...state.traits, action.id].filter(unique)}
        case 'REMOVE_TRAIT':
            let traitIds = state.traits.filter(chosenTrait => chosenTrait !== action.id)
            return {...state, traits: traitIds.filter(unique)}

        default:
            return state
    }
}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}