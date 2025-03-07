import { useDispatch, useSelector } from "react-redux"
import { clearAll, decrement, decrementByAmount, increment, incrementByAmount } from "./features/counter/counterSlice";

export const CountRtk=()=>{

    //useSelector use get value
    const count = useSelector((state)=> state.counter.value)

    //dispatch action to reducer fun using useDispatch
    const dispatch = useDispatch();

    return(
        <>
         <h1>
            Count Test 
         </h1>

        
         <button onClick={()=>dispatch(increment())}>Increment</button>

         <div>{count}</div>

         <button onClick={()=>dispatch(decrement())}>Decrement</button>

         <hr />
           
          <button onClick={()=>dispatch(incrementByAmount(2))}>Increment by 2</button>

          <button onClick={()=>dispatch(decrementByAmount(2))}>Decrement by 2</button>

        <hr />
           <button onClick={()=>dispatch(clearAll())}>Clear All</button>

        </>
    )
} 