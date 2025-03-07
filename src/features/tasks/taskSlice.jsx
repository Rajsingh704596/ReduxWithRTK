import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    task:[],  // empty array
}

//^ RTK Slice- createSlice utility fun that have {initialState, reducer, actionCreator} 
  // export remove so we pass default export taskReducer.reducer for store
 const taskReducer= createSlice({
     name: "task",                     //slice name
     initialState: initialState,       // here data store inside array
     reducers: {   
                    //reducer fun
                    addItem( state, action){
                     state.task.push(action.payload);    // Immer library manage the data so we don't need to use spread operator for immutability , we can direct change the data 
                    },

                    deleteItem(state, action){
                        state.task = state.task.filter((curTask,index)=> { return( index !== action.payload) } )
                    },

                    clearItem(state){
                        state.task= [];       //Task reset
                    }
           }

})

// export {taskReducer};    //named export

export default taskReducer.reducer;     //default export 

// console.log(taskReducer);      //o/p-  {name: 'task', actions: {…}, caseReducers: {…}, reducer: ƒ, getInitialState: ƒ, …}

// action creator export using destructure  -
export const {addItem, deleteItem, clearItem} = taskReducer.actions; 
