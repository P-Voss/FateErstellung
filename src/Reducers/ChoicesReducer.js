
export default function choices(state = {}, action) {
    switch (action.type) {
        case 'PICK_CLASS':
            return {...state, class: action.classId}
        case 'PICK_ELEMENT':
            return {...state, attributes: {...state.attributes, element: action.elementId}}
        case 'PICK_ODO':
            return {...state, attributes: {...state.attributes, odo: action.odoId}}
        case 'PICK_LUCK':
            return {...state, attributes: {...state.attributes, luck: action.luckId}}
        case 'PICK_CIRCUIT':
            return {...state, attributes: {...state.attributes, circuit: action.circuitId}}
        default:
            return state
    }
}