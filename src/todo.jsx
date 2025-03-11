
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTask } from "./Redux/Store";

export const Todo=()=>{

    //^ state create to store data
    const[task, setTask]=useState([]);

    //^Redux store state data(here task) get using useSelector hook
    //const state =useSelector((state)=>state)
    //console.log(state);                       //o/p-  Object{task:[`buy apple`]}
    const tasks=useSelector((state)=> state.task)          //here state is entire redux store  , so now tasks have that data 

    //^send dispatch action (add or delete) using useDispatch hook
    const dispatch = useDispatch()  
    
    //^ handle form submit to add task
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (task === "") return ;
        dispatch(addTask(task));           //addTask is creator action so we need to import this fun
        return setTask("");                //reset input field 
    }

    //^ handle delete task
    const handleDelete=(id)=>{
         return dispatch(deleteTask(id))       //fun. call using dispatch , dispatch the delete action
    }

    //^ handle fetch Task
    const handleFetchTask=()=>{
         return dispatch(fetchTask())         // dispatch(fun. call) the fetchTask(middleware fun) for get api data
    }

    return(  
        <div>
            <div><h1> TODO-LIST </h1></div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} />
                <button type="submit">Add Task</button>
            </form>
             <button onClick={handleFetchTask}>Fetch Task</button>
            <div>
               {
                tasks.map((curTask,index)=>{
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
        </div>
    )
}



//$ Both fun get from react-redux package 
//! useSelector() hook for access Redux State -
//# use the useSelector hook to read data from the Redux store.
//* syntax:         const count = useSelector((state)=> state.property);
//# Selector function: we define a selector function that takes the entire Redux store state as an argument and returns the specific piece of data we need.

//! useDispatch() hook for Dispatch action in React-
//# use the useDispatch hook to dispatch actions from a React Component.