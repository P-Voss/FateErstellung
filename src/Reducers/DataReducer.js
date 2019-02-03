
export default function DataReducer(state = {}, action) {

    switch (action.type) {

        case 'CLASS_LOADED_SUCCESS':
            return {...state, classes: action.classes, subclasses: []}

        case 'ATTRIBUTES_LOADED_SUCCESS':
            return {...state, attributes: action.attributes, subclasses: []}

        case 'TRAITS_LOADED_SUCCESS':
            return {...state, traits: action.traits, subclasses: []}

        case 'SUBCLASS_LOADED_SUCCESS':
            return {...state, subclasses: action.subclasses}

        case 'PLACES_LOADED_SUCCESS':
            return {...state, districts: action.districts, attractions: action.attractions}

        default:
            return state;
    }
}
