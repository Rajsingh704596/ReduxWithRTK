// todo- in Redux only create one store , that's recommended 

//here we just write initial configuration to add RTK Query in store 

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";


export const store = configureStore({
    
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,          // so now apiSlice data we can access in redux            
    },
    //for api management , hooks generation injection , we use apiSlice as a middleware
    middleware:(prevMiddlewares)=> prevMiddlewares().concat(apiSlice.middleware),        


})