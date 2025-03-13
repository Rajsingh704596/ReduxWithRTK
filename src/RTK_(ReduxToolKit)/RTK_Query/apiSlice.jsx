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

// Original apiSlice
const apiSlice = createApi({     

    //RTK by default manage createApi for single apiSlice(here not need to use reducerPath), but when multiple slice use and multiple createApi use then RTK can't manage , so we define reducerPath
        reducerPath: 'todoGet',

        // both functionality byDefault false , when true and setupListener add in RTK_store so  this fun. gives refetch api when(change tab and comes back time api call, online to offline and again offline to online connection lose time api call again )
        refetchOnFocus:true,                //when focus lose to other page and again back to page that time also fetch api call
        refetchOnReconnect:true,

        keepUnusedDataFor:5,          //RTK stored fetch data default 60 sec in cache , but we can control using keepUnusedDataFor how many times(sec) state data in cache , we can used here  or we can used for individual api call but used inside define

        tagTypes:['AddTodo','GetAllTodoTag'],                //^2nd way here diff.- diff. tagTypes pass inside array which we attach to endpoints using provideTags
        baseQuery : fetchBaseQuery({baseUrl:"https://dummyjson.com"}),
        endpoints: function(builder){    
        return{ 
                                           //^ builder.query used for get request 
            getAllTodos :builder.query({           //here we create getAllTodos fun , so apiSlice generate useGetAllTodosQuery
                // keepUnusedDataFor:4,           // here it's individual for this api work after 4 sec data again fetch when this fun call ,and in 4 sec it's take all data from cache not call api again and again
                query: ()=>{
                    return "/todos";
                },
                providesTags:["GetAllTodoTags"],             //now it's tag use to control api of getAllTodos
               //when we get data from server, so we have power to transform that data , RtK query gives special key transformResponse , which we use in every endpoint ,also transformErrorResponse
               transformResponse:function(data){
                    return  data?.todos  ||  [] ;
               },

            }),   

            getTodo :builder.query({               
                 
                query: (id)=>{                                   
                    return `/todos/${id}`;                     
                }
            }),

            addTodo :builder.mutation({           //addTodo fun  , builder.mutation use b/c post req send
                query:(params)=>{
                    return{
                    url : '/todos/add',
                    method:"POST",
                    body: params ,
                }},
                invalidatesTags:['GetAllTodoTag']           //when addTodo query complete , GetAllTodoTag invalidate and data refetch
            })
        }
       
    }

})

export default apiSlice;
export const{ useGetAllTodosQuery, useLazyGetTodoQuery , useAddTodoMutation } = apiSlice;


//! RTK query gives 5  different hooks-
//# 1> useQuery -  it's hook , which call api automatically , it provide fetch data, loading or error state
//^ useQuery naming convention with React -  use+YourFunctionName+Query  e.g useGetAllTodosQuery

//# 2> useLazyQuery - this hook provide manual control that when we want to call api 
//^ naming convention - useLazy+FunName+Query  , e.g useLazyGetTodoQuery













