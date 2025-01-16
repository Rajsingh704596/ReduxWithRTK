
import './App.css'
import { TodosRtk } from './TodosRtk'
// import { Todo } from './todo'

function App() {
  return (
    <>
     {/* <Todo/>     */}
     <TodosRtk/>
    </>
  )
}

export default App


//todo- npm i react-redux   (package install for connect react + redux )
//^ To use Redux in a React app, we need to connect Redux's store and actions to React components. This allows components to access the global state and dispatch actions.

//$ step-2 Wrap the App with Provider component in main.jsx:
//^ use the Provider component to pass the Redux store to the entire app. 