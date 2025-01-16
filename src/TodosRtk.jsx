
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearItem, deleteItem } from "./features/tasks/taskSlice";


export const TodosRtk=()=>{

    //^ state create to store data
    const[taskItem, setTaskItem]=useState([]);

    //^Redux RTK store state data(here task) get using useSelector hook
    // const state =useSelector((state)=>state)
    // console.log(state);                       //o/p-  {taskReducer:{task:[`buy apple`]}}
    const tasksArray=useSelector((state)=> state.taskReducer.task)          //here state is entire redux store  , so now tasks have that data 

    //^send dispatch action (add or delete) to Redux-RTK using useDispatch hook
    const dispatch = useDispatch()  
    
    //^ handle form submit to add task
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (taskItem === "") return ;
        dispatch(addItem(taskItem));           //addItem is creator action so we need to import this fun
        return setTaskItem("");                //reset input field 
    }

    //^ handle delete task
    const handleDelete=(id)=>{
         return dispatch(deleteItem(id));       //fun. call using dispatch , dispatch the delete action
    }

    // //^ handle fetch Task
    // const handleFetchTask=()=>{
    //      return dispatch(fetchTask())         // dispatch(fun. call) the fetchTask(middleware fun) for get api data
    // }

    //^ handle Clear all
    const handleClear=()=>{
        dispatch(clearItem());         //action creator fun call
    }

    return(  
        <div>
            <div><h1> TODO-LIST using Redux-RTK </h1></div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={taskItem} onChange={(e)=>setTaskItem(e.target.value)} />
                <button type="submit">Add Task</button>
            </form>
             {/* <button onClick={handleFetchTask}>Fetch Task</button> */}
            <div>
               {
                tasksArray.map((curTask,index)=>{
                    return(
                        <div key={index}>
                        <li>
                          {index+1} : {curTask}
                        </li>
                        <button onClick={()=>handleDelete(index)}>Delete</button>
                        </div>
                    )
                })
               }
            </div>
            <button onClick={handleClear}>Clear All</button>
        </div>
    )
}



//! useSelector() hook for access Redux State -
//# use the useSelector hook to read data from the Redux store.
//* syntax:         const count = useSelector((state)=> state.property);
//# Selector function: we define a selector function that takes the entire Redux store state as an argument and returns the specific piece of data we need.

//! useDispatch() hook for Dispatch action in React-
//# use the useDispatch hook to dispatch actions from a React Component.