import { useGetAllTodosQuery } from "./RTK_(ReduxToolKit)/RTK_Query/apiSlice"

export default function ApiRTK_Todo() {

    const{data,isLoading,error}=useGetAllTodosQuery();

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>{error.message}</h1>

    console.log(data);

  return (
    <ul>
        {data?.map((curElem)=>{
           return(
            <li key={curElem?.id}>
              {curElem?.todo}
            </li>
           )
        })}
      
    </ul>
  )
}

