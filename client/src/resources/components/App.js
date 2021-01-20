import ToDoList from "./ToDoList.js";
import {Container} from '@material-ui/core'

const App = () =>
  <Container maxWidth="sm" className="app">
    <ToDoList className ="todolist"/>
  </Container>

export default App;