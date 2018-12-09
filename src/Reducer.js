
import person from './Reducers/PersonReducer'
import data from './Reducers/DataReducer'
import creationPoints from './Reducers/PointsReducer'
import choices from './Reducers/ChoicesReducer'

const initialState = {
    steps: [
        'Person',
        'Klasse',
        'Eigenschaften',
        'Traits',
        'Unterklasse'
    ],
    activeStep: 0,
    creationPoints: 30,
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
            circuits: [],
            luck: []
        },
        traits: [],
    },
    choices: {
        chosenClass: 0,
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

export default function creationApp(state = initialState, action) {
    return {
        choices: choices(state.choices, action),
        person: person(state.person, action),
        creationData: data(state.creationData, action),
        creationPoints: creationPoints(action, state.creationData, state.choices)
    }
};