
import person from './Reducers/PersonReducer'

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
    class: {
        id: ''
    },
    attributes: {
        element: '',
        odo: '',
        circuit: '',
        luck: ''
    },
    traits: [],
    specificClass: {
        id: ''
    }
};


export default function creationApp(state = initialState, action) {
    return {
        person: person(state.person, action)
    }
};