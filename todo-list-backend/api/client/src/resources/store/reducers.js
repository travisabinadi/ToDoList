import actions from './actions.js'

/**
 * ToDo Item format
 * 
 * ID: int
 * Name: string
 * Description: string
 * Status: bool
 * Priority: int
 * CreatedBy: string
 * DateCreated: date
 */

export const toDoItem = (state = {}, action) => {
    switch (action.type) {
        case actions.ADD_TODO_ITEM:
            console.log(action.id)
            return {
                id: action.id,
                name: action.name,
                description: action.description,
                status: action.status,
                priority: action.priority,
                createdBy: action.createdBy,
                dateCreated: action.dateCreated
            }
        case actions.UPDATE_TODO_ITEM:
            return (state.id !== action.id) ?
                state :
                {
                    name: action.name,
                    description: action.description,
                    status: action.status,
                    priority: action.priority,
                    ...state
                }
        default:
            return state
    }
}

export const toDoItems = (state = [], action) => {

    switch (action.type) {
        case actions.ADD_TODO_ITEM:
            return [
                ...state,
                toDoItem({}, action)
            ]
        case actions.UPDATE_TODO_ITEM:
            var {type, ...rest} = action;
            state = state.filter(
                item => item.id !== action.id
            )
            return [...state, toDoItem(rest, action)]

        case actions.REMOVE_TODO_ITEM:
            return state.filter(
                item => item.id !== action.id
            )
        default:
            return state
    }
}

export const currState = (state={}, action) =>
{
    switch (action.type)
    {
        case actions.UPDATE_CURR_FILTER:
            return {
                ...state, 
                filter: action.filter}
        case actions.UPDATE_CURR_ITEM:
            return {
                ...state, 
                updatingItem: action.id}
        case actions.UPDATE_TODO_TITLE:
            return {
                ...state, 
                title: action.title}
        default: return state;
    }
}






