
import ApiRTK_Todo from './ApiRTK_Todo'
import './App.css'
// import { CountRtk } from './CountRtk'
// import { TodosRtk } from './TodosRtk'
// import { Todo } from './todo'

function App() {
  return (
    <>
     {/* <Todo/>     */}
     {/* <TodosRtk/> */}
     <hr />
     {/* <CountRtk/> */}
     <hr />
     <ApiRTK_Todo/>
    </>
  )
}

export default App


//todo- npm i react-redux   (package install for connect react + redux )
//^ To use Redux in a React app, we need to connect Redux's store and actions to React components. This allows components to access the global state and dispatch actions.

//$ step-2 Wrap the App with Provider component in main.jsx:
//^ use the Provider component to pass the Redux store to the entire app. 