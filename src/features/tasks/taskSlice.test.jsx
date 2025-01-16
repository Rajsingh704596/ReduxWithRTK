
//^ add and delete task for Testing purpose

import { stores } from "../../RTK_(ReduxToolKit)/RTK_Store";
import { addItem, deleteItem } from "./taskSlice";

console.log(stores.dispatch(addItem("buy mango")));        //o/p-{type: 'task/addItem', payload: 'buy mango'}
console.log(stores.getState());              //o/p- {taskReducer: {…}}

console.log(stores.dispatch(addItem("buy Orange")));      //o/p-{type: 'task/addItem', payload: 'buy Orange'}
console.log(stores.getState());              //o/p- {taskReducer: {…}}

console.log(stores.dispatch(deleteItem(1)));   //o/p- {type: 'task/deleteItem', payload: 1}
console.log(stores.getState());          //o/p- {taskReducer: {…}}
