
export default function choices(state = {}, action) {
    switch (action.type) {
        case 'PICK_CLASS':
            let classId = action.classId * 1
            if (classId === 5) {
                return {...state, chosenClass: classId, subclass: 0}
            } else {
                return {...state, attributes: {...state.attributes, circuit: 0}, chosenClass: classId, subclass: 0}
            }
        case 'PICK_ELEMENT':
            return {...state, subclass: 0, attributes: {...state.attributes, element: action.elementId * 1}}
        case 'PICK_ODO':
            return {...state, subclass: 0, attributes: {...state.attributes, odo: action.odoId * 1}}
        case 'PICK_LUCK':
            return {...state, subclass: 0, attributes: {...state.attributes, luck: action.luckId * 1}}
        case 'PICK_CIRCUIT':
            return {...state, subclass: 0, attributes: {...state.attributes, circuit: action.circuitId * 1}}
        case 'PICK_TRAIT':
            return {...state, subclass: 0, traits: [...state.traits, action.id * 1].filter(unique)}
        case 'REMOVE_TRAIT':
            let traitIds = state.traits.filter(chosenTrait => chosenTrait * 1 !== action.id * 1)
            return {...state, subclass: 0, traits: traitIds.filter(unique)}
        case 'PICK_SUBCLASS':
            return {...state, subclass: action.id * 1}
        case 'REMOVE_SUBCLASS':
            return {...state, subclass: 0}
        case 'SUBCLASS_LOADED_SUCCESS':
            return {...state, subclass: 0}

        default:
            return state
    }
}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}