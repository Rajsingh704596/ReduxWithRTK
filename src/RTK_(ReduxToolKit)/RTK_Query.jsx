//! RTK Query - RTK Query is a powerful data fetching and caching tool. (RTK is "API Management + Caching" library)

//# RTK many Problem solved -  1> Not to write code for api call         2> Calling the api outside the useEffect      3> Caching problem solve(refresh time data not lost)

//todo- 3 Types of Fetching process -
//^   1. Render while fetch  -  RTK Query (Jaise hi api data aa jata hai to render ko stop kar deta hai or updated data k sath UI ko display karta hai) so here we save one render cycle
//^   2. Render then fetch  -  useEffect (phle component render hota hai baad m data fetch hota hai )
//^   3. fetch then Render -  (Component ko import karne se phle hi api call lagate hai), this pattern makes our component slow sometime.
 


