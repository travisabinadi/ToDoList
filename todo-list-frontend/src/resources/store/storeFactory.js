import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import { toDoItems, currState } from './reducers'
import stateData from './initialState'

//Loger for testing states.
const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

//Save the information to the localstorage as a JSON file for testing
const saver = store => next => action => {
    let result = next(action)
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
}

//Create the store
//TODO! Make so the store is filled by the Node.js API
const storeFactory = (initialState = stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({ toDoItems,currState }),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            initialState
    )
export default storeFactory