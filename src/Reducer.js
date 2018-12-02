
import person from './Reducers/PersonReducer'
import data from './Reducers/DataReducer'

const initialState = {
    steps: [
        'Person',
        'Klasse',
        'Eigenschaften',
        'Traits',
        'Unterklasse'
    ],
    activeStep: 0,
    person: {
        firstname: '',
        surname: '',
        gender: 'female',
        dateOfBirth: '1995-01-01',
        eyeColor: '',
        size: '',
        preference: '',
        residence: ''
    },
    creationData: {
        classes: [],
        attributes: {
            elements: [],
            odo: [],
            circuit: [],
            luck: []
        },
        traits: [],
    },
    choices: {
        class: 0,
        traits: [],
        specificClass: 0,
        attributes: {
            element: 0,
            odo: 0,
            circuit: 0,
            luck: 0
        },
    }
};

function choices(state = {}, action) {
    switch (action.type) {
        case 'PICK_CLASS':
            return {...state, class: action.classId}
        case 'PICK_ELEMENT':
            return {...state, attributes: {...state.attributes, element: action.elementId}}
        default:
            return state
    }
}

export default function creationApp(state = initialState, action) {
    return {
        choices: choices(state.choices, action),
        person: person(state.person, action),
        creationData: data(state.creationData, action)
    }
};