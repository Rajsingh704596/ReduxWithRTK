//! api slice - It represent One module of api endpoint, so if we have multiple api module we need more than one apiSlice 


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";    // for react we import this createApi


//^ 1 st way-

// const apiSlice = createApi({        

//     endpoints: function(builder){    //endpoints which value is function , and this fun is callback fun which is call by createApi , so i will get object which name is builder , this anonymous fun return object
//         return{ 
//             getAllTodos :builder.query({           //builder.query() call so all api functionality inject in getAllTodos fun
                 
//                 queryFn: async () => {
//                     try {
//                         const response = await fetch("https://dummyjson.com/todos");
//                         const data = await response.json();
//                         const todos = data.todos;
//                         console.log(todos);
//                         return { data: todos };
//                     } catch (error) {
//                         console.error("Error fetching todos:", error);
//                         return { error: error.message };
//                     }
//                 }
//             })         
//         }
       
//     }

// })


// ^ 2nd Way-    RTK Query gives fun for api call like fetchBaseQuery , it's js fetch mechanism . which handle api call , we don't need  write any other code

const apiSlice = createApi({     
    
    baseQuery : fetchBaseQuery({baseUrl:"https://dummyjson.com"}),

    endpoints: function(builder){    
        return{ 

            getAllTodos :builder.query({           //here we create getAllTodos , so apiSlice generate useGetAllTodosQuery

                query: ()=>{
                    return "/todos";
                },

               //when we get data from server, so we have power to transform that data , RtK query gives special key transformResponse , which we use in every endpoint ,also transformErrorResponse
               transformResponse:function(data){
                    return  data?.todos  ||  {} ;
               },

            }),   

            getTodo :builder.query({               
                 
                query: (id)=>{
                    return `/todos/${id}`;
                }
            })         
        }
       
    }

})

export default apiSlice;
export const{ useGetAllTodosQuery, useLazyGetTodoQuery } = apiSlice;


//! RTK query gives 5  different hooks-
//# 1> useQuery -  it's hook , which call api automatically , it provide fetch data, loading or error state
//^ useQuery naming convention with React -  use+YourFunctionName+Query  e.g useGetAllTodosQuery

//# 2> useLazyQuery - this hook provide control that when we want to call api 
//^ naming convention - useLazy+FunName+Query  , e.g useLazyGetTodoQuery





