import {createStore, applyMiddleware} from "redux"
import thunkMiddleware from "redux-thunk"

import creationApp from "./Reducer"


import {createLogger} from "redux-logger"
import {composeWithDevTools} from "redux-devtools-extension"

import throttle from "lodash/throttle"
import {loadStore, saveStore} from "./localStorage"

const middleWare = []
middleWare.push(thunkMiddleware)
const loggerMiddleware = createLogger()
middleWare.push(loggerMiddleware)

const localStore = loadStore()
const store = createStore(
    creationApp,
    localStore,
    composeWithDevTools(applyMiddleware(...middleWare))
)

store.subscribe(throttle(() => {
    saveStore(
        {
            person: store.getState().person,
            choices: store.getState().choices,
            system: store.getState().system,
        }
    )
}, 1000))

export default store