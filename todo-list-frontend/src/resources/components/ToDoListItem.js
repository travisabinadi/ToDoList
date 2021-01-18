import { removeToDoItem, updateToDoItem, addToDoItem, updateCurrItem } from '../store/actionCreators'
import React from 'react'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { ReactReduxContext } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip';


//Todo item contained within the list.
const ToDoItem = (props) => {
    const { item, labelId, removeItem, updateCurrToDoItem, updateItem } = props
    
    
    return <ReactReduxContext.Consumer>
        {({ store }) => {
            //Get the ID of the item being updated
            var updatingId = store.getState().currState.updatingItem
            const handleToggle = (value) => () => {
                //This if check is to see if the modal is open. If it is, don't automatically
                //refresh. This is because the modal the opens is directly be connected
                //to the check box.
                if(updatingId === 0)
                {
                    item.status = item.status ? false : true;
                    updateItem(item)
                }
            };
            return <ListItem key={item.id} id={item.id} className="todoListItem" role={undefined} button onClick={handleToggle(item.id)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={item.status}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${item.name}`} />
                <ListItemSecondaryAction>
                <Tooltip title="Edit">
                    <IconButton edge="end" aria-label="edit" onClick={(e) => updateCurrToDoItem(item)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip >
                <Tooltip title="Delete">
                    <IconButton edge="end" aria-label="delete" onClick={(e) => removeItem(item.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        }}
    </ReactReduxContext.Consumer>
}


const mapStateToProps = state => {
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
    updateItem(item) {
        dispatch(updateToDoItem(item))
    },
    updateCurrToDoItem(item) {
        dispatch(updateCurrItem(item))
    }
})
const ToDoListItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDoItem)

export default ToDoListItem;