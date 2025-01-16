import { configureStore} from "@reduxjs/toolkit"
// import {taskReducer} from "../features/tasks/taskSlice";
import taskReducer from "../features/tasks/taskSlice";




//^ store create using configureStore
export const stores = configureStore({
    reducer:{   //here we can pass multiple reducer
    //  taskReducer : taskReducer.reducer,        // for named export 

    //    taskReducer : taskReducer,             //default export we already get taskReducer.reducer       , here key and value both same so we write like this-
          taskReducer,                      
    }
 })


