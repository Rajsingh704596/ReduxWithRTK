//! api slice - It represent One module of api endpoint, so if we have multiple api module we need more than one apiSlice 


import { createApi } from "@reduxjs/toolkit/query/react";    // for react we import this createApi


const apiSlice = createApi({        

    endpoints: function(builder){    //endpoints which value is function , and this fun is callback fun which is call by createApi , so i will get object which name is builder , this anonymous fun return object
        return{ 
            getAllTodos :builder.query({           //builder.query() call so all api functionality inject in getAllTodos fun
                 
                queryFn: async () => {
                    try {
                        const response = await fetch("https://dummyjson.com/todos");
                        const data = await response.json();
                        const todos = data.todos;
                        console.log(todos);
                        return { data: todos };
                    } catch (error) {
                        console.error("Error fetching todos:", error);
                        return { error: error.message };
                    }
                }
            })         
        }
       
    }

})

export default apiSlice;
export const{useGetAllTodosQuery} = apiSlice;


//! RTK query gives 5  different hooks-
//# useQuery -  it's hook , when we call , it provide fetch data, loading or error state
//^ useQuery naming convention with React -  use+YourFunctionName+Query  e.g useGetAllTodosQuery





