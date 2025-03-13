
//! Not Recommended way -  create Multiple api slice , 

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// const deleteApiSlice = createApi({     
    
//     reducerPath: "todoDelete",
//     baseQuery : fetchBaseQuery({baseUrl:"https://dummyjson.com"}),

//     endpoints: function(builder){    
//         return{  
//                                         //^ builder.mutation used for put , patch , post , delete request                          
//             deleteTodo :builder.mutation({           //here deleteTodo fun name create , so we get useDeleteTodoMutation from deleteApiSlice

//                 query: (id)=>{          //here query fun we return object instead of string
//                     return {
//                         url:`/todos/${id}`,
//                         method:'DELETE',        //for delete request , we send method delete 
//                     }
//                 },

//                //when we get data from server, so we have power to transform that data , RtK query gives special key transformResponse , which we use in every endpoint ,also transformErrorResponse
//                transformResponse:function(data){
//                     return  data?.todos  ||  {} ;
//                },

//             }),   
  
//         }
       
//     }

// })

// export default deleteApiSlice;                 //which used to import in RTKQuery_Store.jsx
// export const{ useDeleteTodoMutation } = deleteApiSlice;                 // which used to import in react component ApiRtK_Todo.jsx for delete todo



//!   Redux recommended that - create Api call one time in our application . we can have multiple apiSlice then combined it in original apiSlice using injectEndpoints() method

import apiSlice from "./apiSlice";

const deleteApiSlice = apiSlice.injectEndpoints({          // Injecting deleteTodo mutation into apiSlice

    endpoints: (builder) =>{
        return{
            deleteTodo : builder.mutation({
                query:(id)=>({
                    url : `todos/${id}`,
                    method:"DELETE",
                }),
               onQueryStarted: function(id, {dispatch, queryFulfilled}) {       // Optimistic update: when delete button click instant remove from UI
            const action = dispatch(
                    apiSlice.util.updateQueryData('getAllTodos',undefined,function(todos){          //here getAllTodos query want update, parameter undefined , and function call
                        console.log(todos);
                        const newTodos = todos.filter((todo)=> todo.id !== id);
                        console.log(todos);
                        return newTodos;
                 })              
                )
                queryFulfilled.catch(()=>{   // if deleteApi call failed so action undo
                    action.undo();
                })
               }
            })
        } 
    }
})


export const{ useDeleteTodoMutation } = deleteApiSlice; 

