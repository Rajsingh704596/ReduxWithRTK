/* eslint-disable no-case-declarations */
import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from "redux";
import { thunk } from 'redux-thunk';

const initialState={             //it's a object 
    task:[],
}

// Define Action Types: stateDomain & the Event
const Add_Task= 'task/add';
const Delete_Task= "task/delete";
const Fetch_Task="task/fetch";

//#1. create Reducer Functions to Add & Delete Tasks 
const reducerFun=(state=initialState, action)=>{

    switch(action.type){

        case Add_Task:
            return{
                ...state,  
                task:[...state.task, action.payload],     //old data update with the help of spread operator 
            }

        case Delete_Task:
            const updateTask= state.task.filter((curTask, index)=>{
                return index !== action.payload;
            })
            return{
                ...state, 
                task: updateTask,
            };

        case Fetch_Task:
            return{
                ...state,                              // previous spread state data as a tease
      // task:[...state.task, action.payload],  //(in task) previous state.task as a tease , add payload data (which is get from fetch api call)
               task:[...state.task, ...action.payload],   // here we spared for get fetch data individual add in todo list not combined thats why we use ...action.payload 
            };
          
            default:
                return state;         
    }
}

//# step 2: Create the Redux store using the reducer
export const store= createStore(reducerFun, composeWithDevTools(applyMiddleware(thunk)));               //composeWithDevTools() use for redux dev tool
console.log(store)                   //o/p- {dispatch:f, subscribe:f, getState:f, replaceReducer:f, @@observable:f}


//# step 3: getState use
const state = store.getState();
console.log( "initial state", state);   //log the initial state   //o/p- initial state: {task: Array(0)}


//# step 4: dispatch method use to send action (Add or Delete a task) to reducer fun.
store.dispatch({ type: Add_Task, payload:"buy mango" });
console.log("updated state", state);

store.dispatch({ type: Add_Task, payload:"buy apple" });
console.log("add task", state);

store.dispatch({ type:Delete_Task, payload:1 })
console.log("After delete remaining task", state);

//^ Either we use step 4 or we use simplify step 5
//# step 5: Create action creators

export const addTask=(data)=>{
    return { type: Add_Task, payload: data };
}
store.dispatch( addTask( "buy orange" ) );       //@ Note- According rule fun call after define when we use arrow fun. but In other-side traditional normal fun we call fun before fun definition it works because of hoisting we get data 
store.dispatch( addTask( "buy phone" ));
console.log("add task",state);                               


export const deleteTask=(id)=>{
    return { type: Delete_Task, payload: id};     //In normal action creator return action (pure object form) 
}
store.dispatch( deleteTask(0));   //fun. call  


//# Create Middleware fun. using Redux Thunk for dispatch fetch api data(asynchronous operation)
export const fetchTask=()=>{
    return async(dispatch)=>{  
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");  //fetch api call to get data
            const task=await res.json();
            console.log(task);        //o/p- [{..},{..},] so it's give array of obj , we need only pass title in todo list so we use map method 
            dispatch( { type:Fetch_Task, payload:task.map((curTask)=>curTask.title)  } );        // return dispatch when successfully get data

        } catch (error) {
            console.log(error)
        }
    }
}



//todo-  npm i redux     (package install for use Redux property)

//! 1. Reducer function-
// #  A reducer is a fun that decides how the state should change based on the action. The reducer takes "the current state and an action" and returns a new state.
//^ key point--    1)Reducer must always new state.        2) They should never modify the old state directly.

//* syntax-   const ACTION_TYPE: 'task/add'
//*           function reducer( state = initialState, action){
//*                       switch(action.type){
//*                         case ACTION_TYPE :
//*                          return{...state, data: action.payload};  }}
//^    state: This is the current state          Action: this tells the reducer what to do, it has a type and sometimes a payload(which is data)
//^ we use switch statement to check the action's type. and Based on the action type, the reducer 'updates the state'.

//! Redux Store- 
//# The store is where Redux keeps all our app data. It's like a database for our app, but it's only for managing data in memory ( not saving it permanently ).
//* syntax:   const store = createStore(reducer);
//# The createStore method-- creates the Redux store using a reducer function that handles how the state changes in response to actions.


//! 3. Dispatch()-
//# dispatch() is used to send actions to the Redux store. 
//# An action describes what change we want to the state (such as adding a task).
//* syntax:   store.dispatch( { type:"Action_Type", payload: data } );          // inside Object type must be pass , payload use for extra data pass

//! 4. getState()-
//# getState() retrieves the current state of the Redux store.
//# this is useful for accessing the state after it has been updated or to monitor changes.
//# the getState method is a synchronous function that returns the current state of a Redux application. It include the entire state of the application, including all the reducers and their respective states.


//! 5. Redux Action-
//# An action is an object that tells Redux what we want to do. 
//# It must have a type property that describes the action.      
//  {type:'Action_Type', payload:someData}
//! 5-a. Action Creator-
//# Action Creator is not part of redux. it is convention for making redux code more better
//# An action creator is a function that creates an action object.
//# This makes it easier to create actions with different data.
//* syntax:        function actionCreator(data){
//*                                 return{type:"Action_Type", payload:data}   }



//! Redux dev tool -
//$ step 1-  chrome extension download
//$ step 2-  npm i @redux-devtools/extension            (package install)
//$ step 3-  (In Redux store component add)
//^        import { composeWithDevTools } from '@redux-devtools/extension';
//^       export const store= createStore( reducerFun, composeWithDevTools() );


//! Redux Thunk (for Middleware)-
//# Redux Thunk is middleware that allows us "to write action creators that return a function instead of an action". This function can perform asynchronous logic(like API requests) and dispatch actions after the operation is complete ( e.g fetching tasks and then dispatching them to the store).
  //^ when we return a function from an action creator. "Redux Thunk provides the dispatch function as an argument." This allows us to manually dispatch other actions (e.g. when an API call succeeds or fails).
 
//$ step-1  npm i redux-thunk   (package install)
//$ step-2 export const store= createStore(reducerFun, composeWithDevTools( applyMiddleware (thunk) ));      

