import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { updateToDoItem, updateCurrItem } from '../store/actionCreators'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "30%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const SimpleModal = ({ updateCurrToDoItem,updateItem, item }) => {
    const classes = useStyles();
    const modalStyle = getModalStyle()
    const handleClose = () =>
    {
        item.name = document.getElementById("AddItemTxtModal"+item.id).value
        updateItem(item)
        updateCurrToDoItem({ type: "UPDATE_CURR_ITEM", id: "" })
    }
    return <Modal
                    open={true}
                    onClose={handleClose}
                    aria-describedby="Edit-Item-Modal"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2>Edit Task</h2>
                        <TextField id={"AddItemTxtModal"+item.id} label="Task Name" onFocus={(event) => event.target.select()}
                            defaultValue={item.name} variant="outlined" focused={true} onKeyPress={e => {if(e.key === "Enter") handleClose()}} className="editModalTxt" />
                        <span className="editModalSubmitBtn">
                        <Button variant="contained" color="primary" style={{marginTop:"2%"}} onClick={handleClose}>
                            Submit
                        </Button>
                        </span>
                    </div>
                </Modal>
}


const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch =>
({
    updateItem(item) {
        dispatch(updateToDoItem(item))
    },
    updateCurrToDoItem(item) {
        dispatch(updateCurrItem(item))
    }
})
const EditModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(SimpleModal)

export default EditModal;
