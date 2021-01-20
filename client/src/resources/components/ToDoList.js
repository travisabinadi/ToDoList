import React from 'react';
import Title from './Title'
import List from '@material-ui/core/List';
import ToDoListItem from './ToDoListItem'
import { removeToDoItem, updateToDoItem, addToDoItem } from '../store/actionCreators'
import { connect } from 'react-redux'
import { ReactReduxContext } from 'react-redux'
import uuid from 'react-uuid'
import ToDoListMenu from './ToDoListMenu'

//List of all todo items
const ToDo = () => <div className="todolist">
        <ReactReduxContext.Consumer >
            {({ store }) => {
                    var currFilter = store.getState().currState.filter
                    //Filter the array of todo items based on the current filter set.
                    var itemsToShow = store.getState().toDoItems.filter(i => (!i.status && currFilter === "Pending") || (i.status && currFilter === "Completed") || currFilter === "All")
                    //Take the filtered items and sort them by date created.
                    itemsToShow = itemsToShow.sort((i1, i2) => {
                        if(i1.dateCreated < i2.dateCreated) return -1;
                        if(i1.dateCreated > i2.dateCreated) return 1;
                        return 0;
                    })
                return <div>
                    <Title />
                    <ToDoListMenu/>
                    <List key={uuid()}>
                        {/* TODO! Get values from the store */}
                        {itemsToShow.map((toDoItem) => {
                            const labelId = `checkbox-list-label-${toDoItem.name}`;
                            return <ToDoListItem item={toDoItem} key={toDoItem.id} id={toDoItem.name} labelId={labelId} />
                        })}
                    </List>
                </div>
            }}
        </ReactReduxContext.Consumer>
    </div>

const mapStateToProps = state =>
{
    return state;
}

const mapDispatchToProps = dispatch =>
({
    addItem() {
        dispatch(addToDoItem())
    },
    removeItem(id) {
        dispatch(removeToDoItem(id))
    },
    updateItem(id, toDoItem) {
        dispatch(updateToDoItem(id, toDoItem))
    }
})
const ToDoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDo)

export default ToDoList;