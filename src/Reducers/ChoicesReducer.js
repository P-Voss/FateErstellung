
export default function choices(state = {}, action) {
    switch (action.type) {
        case 'PICK_CLASS':
            if (action.classId === 5) {
                return {...state, chosenClass: action.classId, subclass: 0}
            } else {
                return {...state, attributes: {...state.attributes, circuit: 0}, chosenClass: action.classId, subclass: 0}
            }
        case 'PICK_ELEMENT':
            return {...state, subclass: 0, attributes: {...state.attributes, element: action.elementId}}
        case 'PICK_ODO':
            return {...state, subclass: 0, attributes: {...state.attributes, odo: action.odoId}}
        case 'PICK_LUCK':
            return {...state, subclass: 0, attributes: {...state.attributes, luck: action.luckId}}
        case 'PICK_CIRCUIT':
            return {...state, subclass: 0, attributes: {...state.attributes, circuit: action.circuitId}}
        case 'PICK_TRAIT':
            return {...state, subclass: 0, traits: [...state.traits, action.id].filter(unique)}
        case 'REMOVE_TRAIT':
            let traitIds = state.traits.filter(chosenTrait => chosenTrait !== action.id)
            return {...state, subclass: 0, traits: traitIds.filter(unique)}
        case 'PICK_SUBCLASS':
            return {...state, subclass: action.id}
        case 'REMOVE_SUBCLASS':
            return {...state, subclass: 0}

        default:
            return state
    }
}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}