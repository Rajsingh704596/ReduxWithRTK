// todo- in Redux only create one store , that's recommended 

//here we just write initial configuration to add RTK Query in store 

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
// import deleteApiSlice from "./deleteApiSlice";

import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
    
    reducer:{

        [apiSlice.reducerPath]:apiSlice.reducer,          // so now apiSlice data we can access in redux    
        
        // [deleteApiSlice.reducerPath]:deleteApiSlice.reducer,        //!not recommended way
    },
    //for api management , hooks generation injection , we use apiSlice as a middleware
     middleware:(prevMiddlewares)=> prevMiddlewares().concat(apiSlice.middleware),           //^ when single api slice pass     
    
   // middleware:(prevMiddlewares)=> prevMiddlewares().concat([apiSlice.middleware, deleteApiSlice.middleware]),  //^ pass multiple slice inside array     //! not recommended way 

   
})

setupListeners(store.dispatch);         // now all event onBlur, onFocus etc. ara activate