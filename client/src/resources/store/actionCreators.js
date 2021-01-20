import actions from './actions'
import uuid from 'react-uuid'


export const addToDoItem = () =>
({
    type: actions.ADD_TODO_ITEM,
    id: uuid(),
    name: "New Item",
    description: "",
    status: false,
    priority: 0,
    createdBy: "",//TODO! Set up get user name
    dateCreated: Date.now()
})

export const updateToDoItem = (toUpdate) =>
({
    type: actions.UPDATE_TODO_ITEM,
    ...toUpdate
})

export const removeToDoItem = id =>
({
    type: actions.REMOVE_TODO_ITEM,
    id
})

export const updateCurrFilter = filter =>
({
    type: actions.UPDATE_CURR_FILTER,
    filter: filter
})

//This action creator is to determine if an item is currently being updated.
//If an item is, the item ID is stored here. If it's not, then the default value is 0.
export const updateCurrItem = item =>
({
    type: actions.UPDATE_CURR_ITEM,
    id: item.id
})

export const updateToDoTitle = title =>
({
    type: actions.UPDATE_TODO_TITLE,
    title: title
})