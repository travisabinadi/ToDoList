import {Container} from '@material-ui/core'
import { updateToDoTitle } from '../store/actionCreators'
import { connect } from 'react-redux'
import { ReactReduxContext } from 'react-redux'

const ToDoTitle = ({updateTitle}) =>
  <Container maxWidth="sm" className="title">
    <ReactReduxContext.Consumer>
    {({ store }) => {
      return <input type="text" onKeyPress={e => {if(e.key === "Enter") e.target.blur()}} defaultValue={store.getState().currState.title} onChange={e => updateTitle(e.target.value)} onFocus={e => e.target.select()} className="ToDoListTitleTxt"/>
    }}
    </ReactReduxContext.Consumer>
  </Container>



const mapDispatchToProps = dispatch =>
({
  updateTitle(title) {
      dispatch(updateToDoTitle(title))
  }
})
const Title = connect(
  undefined,
  mapDispatchToProps
)(ToDoTitle)

export default Title;