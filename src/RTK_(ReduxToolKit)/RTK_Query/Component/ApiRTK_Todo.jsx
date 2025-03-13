import { useEffect, useState } from "react";
import { useAddTodoMutation, useGetAllTodosQuery, useLazyGetTodoQuery } from "../apiSlice"
import { useDeleteTodoMutation } from "../deleteApiSlice";

export default function ApiRTK_Todo() {

    const{data,isLoading,error,refetch}=useGetAllTodosQuery();              //useQuery hook where we get data using destructure , but here api call automatic fire
    // console.log("api data",data);

    const[addTodo] = useAddTodoMutation();    //here we get destructure from array fun and result . but we don't need result so only destructure fun

    const[inputTodo, setInputTodo]=useState("");

    const handleInputTodo=(e)=>{
      setInputTodo(e.target.value);
    }

    const handleAddTodo=()=>{

      setInputTodo("");

         addTodo({              // addTodo Fun pass object
            completed:false,
            userId:123,
            todo: inputTodo,
         })                          //^ 1st way - not good .unwrap().then()          //^ 2nd way -  tagTypes used in apiSlice                
        //  .unwrap()              //Redux recommended to used instead directly use .then method.  unwrap() method revert last promise/last action resolved in RTKQuery as a previous state and return it ,
        //  .then((data)=>{
        //     console.log(data);          // if we not used unwrap method it's gives network data , when used unwrap it's gives previous query data
        //     refetch();          // refetch fun call so that updated data show in Ui
        //  })
    }
 

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>{error.message}</h1>

  return (
    <div>
        <div>
          <input type="text" value={inputTodo} onChange={handleInputTodo} />
          <button onClick={handleAddTodo} >Add Todo</button>
        </div>

    <ul>
        {data?.map((curElem)=>{
           return <ApiRTK_TodoList data={curElem} key={curElem.id}/>              
        })}
    </ul>

    
    </div>
  )
}



export const ApiRTK_TodoList=({data})=>{

  const {id,todo:name}=data || {};

  const[trigger, result]=useLazyGetTodoQuery();     //here trigger is getTodo Fun (trigger use API call) 

  // console.log("result provides",result)   //result give [isLoading, data , error] state ,  which we get using array of destructure [b/c data get in array form not object form]
  // for error handling result gives-
  // console.log(result.isError, result.error);

  const [deleteTodoFn, deleteResult] =useDeleteTodoMutation();    // it gives array [function , object provide where all state give]
  //here deleteTodoFn fun call for delete todo in api ,  deleteResult give {isError, isLoading, isSuccess ,..}      

  useEffect(()=>{
    if(deleteResult.isSuccess){
      alert("Todo Deleted")
    }
  },[deleteResult.isSuccess])

  function handleDelete(){
    deleteTodoFn(id);          //api fun call with pass id for delete Todo
 }
  
  
  function handleGetStatus(){
    trigger(id);                   //getTodo Fun call (Api call) where id pass as a parameter
  }

  function getStatus(isCompleted){            
    let status = "Completed";
    if(!isCompleted){
      status = "Pending...";
    }
    return status;
  }


  return(
    
      <li key={id}>
        <p> {name} </p> 
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleGetStatus}>Get Status</button>

        {result?.isLoading && <span>Loading status</span>}         {/* isLoading is true then show in Ui*/}

        {result?.data?.id && getStatus(result?.data?.completed)}      {/*  if id exist means true then fun call to getStatus fun call where boolean data pass of completed */}

        {result.isError && <span>{result?.error?.data?.message}</span>}      {/*isError true then error message show */}

        <></>
      </li>
     
  )
}
