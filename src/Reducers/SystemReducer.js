import {CREATION_SUCCESS, REQUEST_CREATION, CREATION_FAILURE} from "../Actions/CreationActions"

export default function system(state = {}, action) {
    switch (action.type) {

        case REQUEST_CREATION:
            return {...state, loading: true}

        case CREATION_SUCCESS:
            return {...state, loading: false, success: true}

        case CREATION_FAILURE:
            return {...state, loading: false, success: false, error: action.errormessage}


        default:
            return state
    }
}