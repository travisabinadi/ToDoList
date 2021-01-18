import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SortTasks from './SortTasks'
import { removeToDoItem, addToDoItem, updateCurrItem } from '../store/actionCreators'
import React from 'react'
import { connect } from 'react-redux'
import { ReactReduxContext } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip';

const ToDoListMenuOptions = ({ addItem, updateCurrToDoItem }) => <div className="toDoListMenu">
        <ReactReduxContext.Consumer>
            {({ store }) => {
                return <div>
                    <SortTasks currFilter={store.getState().currState.filter} />
                    <Tooltip title="Add">
                        <IconButton edge="end" aria-label="edit" className="addItemBtn" onClick={() => {
                            addItem();
                            //Get the most recent item from the list of items
                            var newItem = store.getState().toDoItems[store.getState().toDoItems.length - 1]
                            //Update the newest item
                            updateCurrToDoItem(newItem);
                        }} >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>

                </div>
            }
            }
        </ReactReduxContext.Consumer>
    </div>

const mapStateToProps = (state) => {
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
    updateCurrToDoItem(item) {
        dispatch(updateCurrItem(item))
    }
})
const ToDoListMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDoListMenuOptions)

export default ToDoListMenu;