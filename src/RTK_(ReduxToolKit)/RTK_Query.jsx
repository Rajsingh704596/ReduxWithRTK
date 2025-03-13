//! RTK Query - RTK Query is a powerful data fetching and caching tool. (RTK is "API Management + Caching" library)

//# RTK many Problem solved -  1> Not to write code for api call         2> Calling the api outside the useEffect      3> Caching problem solve(refresh time data not lost)

//todo- 3 Types of Fetching process -
//^   1. Render while fetch  -  RTK Query (Jaise hi api data aa jata hai to render ko stop kar deta hai or updated data k sath UI ko display karta hai) so here we save one render cycle
//^   2. Render then fetch  -  useEffect (phle component render hota hai baad m data fetch hota hai )
//^   3. fetch then Render -  (Component ko import karne se phle hi api call lagate hai), this pattern makes our component slow sometime.




//$ Topics of RTK-

//1. working with create API

//2. Passing data to Redux Selectors
    // a) Queries        b) createApi 

//3. using params in queries

//4. Handling Errors

//5. Manual Control

//6. Creating multiple API Slices

//7. Post Method

//8. Refetch - after add action using unwrap and refresh

//9. keepUnusedDataFor - whole and individual

//10. tags and invalidation

//11. refetch on focus tab and re-connected
     
//12. prefetch - advance data get before go that page
        // Outside Provider - redux Provider component outside page we want get data before go e.g in app.jsx outside provide we use this method to access first
          //store.dispatch(apiSlice.endpoints.getTodo.initiate(2));
        
        // Inside Provider - component which inside redux provider fetch data get before go that page
          // const getTodoFn = apiSlice.usePreFetch("getTodo");
          // useEffect(()=>{ getTodoFn(2);},[])           // 2 nd todo prefetch         

//13 Headers- set all api with common headers so we used prepareHeaders , so every endpoint add header

    //  header: {key:value}
    //  prepareHeaders :(headers)=>{
    //     headers.set("key","value");
    //     return headers;
    //  }

//14. Optimistic approach     

 

 


