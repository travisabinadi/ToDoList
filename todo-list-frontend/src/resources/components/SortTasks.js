import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { updateCurrFilter } from '../store/actionCreators'
import { connect } from 'react-redux'

const SortToDoTasks = ({updateFilter,currFilter}) => <FormControl className="SortTasks">
    <InputLabel htmlFor="sortTasks">Filter</InputLabel>
    <NativeSelect
        defaultValue={currFilter}
        inputProps={{
            name: 'Filter',
            id: 'sortTasksCmb',
        }}
        onChange={(e) => updateFilter(e.target.value)}
    >
        <option value={"Pending"}>Pending</option>
        <option value={"Completed"}>Completed</option>
        <option value={"All"}>All</option>
    </NativeSelect>
</FormControl>

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch =>
({
    updateFilter(filter) {
        dispatch(updateCurrFilter(filter))
    }
})
const SortTasks = connect(
    mapStateToProps,
    mapDispatchToProps
)(SortToDoTasks)

export default SortTasks;