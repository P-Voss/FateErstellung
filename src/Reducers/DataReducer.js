
export default function DataReducer(state = {}, action) {

    switch (action.type) {

        case 'CLASS_LOADED_SUCCESS':
            return {...state, classes: action.classes}

        case 'ATTRIBUTES_LOADED_SUCCESS':
            return {...state, attributes: action.attributes}

        default:
            return state;
    }
}
