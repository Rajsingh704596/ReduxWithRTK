import { useGetAllTodosQuery, useLazyGetTodoQuery } from "../apiSlice"

export default function ApiRTK_Todo() {

    const{data,isLoading,error}=useGetAllTodosQuery();              //useQuery hook where we get data using destructure , but here api call automatic fire

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>{error.message}</h1>

    console.log("api data",data);

    
  return (
    <div>
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

  const[trigger, result]=useLazyGetTodoQuery();     //here trigger is getTodo Fun (trigger use API call)  , result give [isLoading, data , error]state ,  which we get using array of destructure [b/c data get in array form not object form]
  console.log("result provides",result)   
  
  function handleGetStatus(){
    trigger(id);                   //getTodo Fun call where id pass
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
        <button onClick={handleGetStatus}>Get Status</button>
        {result?.isLoading &&  <span>Loading status</span>}
        {result?.data?.id && getStatus(result?.data?.completed)}
      </li>
     
  )
}
