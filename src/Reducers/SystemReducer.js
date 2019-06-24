import {CREATION_SUCCESS, REQUEST_CREATION, CREATION_FAILURE, CONFIRM_ERROR} from "../Actions/CreationActions"

export default function system(state = {}, action) {
    switch (action.type) {

        case REQUEST_CREATION:
            return {...state, loading: true}

        case CREATION_SUCCESS:
            return {...state, loading: false, success: true}

        case CREATION_FAILURE:
            return {...state, loading: false, success: false, error: action.errormessage}

        case CONFIRM_ERROR:
            return {...state, loading: false, success: false, error: ''}

        default:
            return state
    }
}