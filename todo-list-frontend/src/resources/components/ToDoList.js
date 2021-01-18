import React from 'react';
import Title from './Title'
import List from '@material-ui/core/List';
import ToDoListItem from './ToDoListItem'
import ToDoListMenu from './ToDoListMenu'

//List of all todo items
const ToDoList = (toDoItem) => <div className="todolist">
    <Title />
    <ToDoListMenu />
    <List key={1}>
        {/* TODO! Get values from the store */}
        {[0,1,2].map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return <ToDoListItem item={toDoItem} key={value} id={value} labelId={labelId} />
        })}
    </List>
</div>

export default ToDoList