import {
    createStore,
    combineReducers,
    // applyMiddleware
} from 'redux'
import { toDoItems, currState } from './reducers'

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

const storeFactory = (initialState = {}) =>
(createStore)(
    combineReducers({ toDoItems, currState }), initialState)
    // applyMiddleware(logger)(createStore)(
    //     combineReducers({ toDoItems, currState }), initialState)

export default storeFactory;