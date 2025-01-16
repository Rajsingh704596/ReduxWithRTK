//! Redux ToolKit (RTK)-
//# RTK is an official toolset from the Redux team that makes working with Redux easier and less time-consuming.
//# Instead of doing everything manually -- like creating actions, reducers, and managing state immutability -- RTK gives us built-in functions that handle most of that work for us.


//! Why Redux Toolkit (Advantage) ?
//$ Less Boilerplate Code: 
//# Normally, with Redux, we need to write action types, action creators, and reducers separately, with RTK's " createSlice " , we can handle all of this in one place, in fewer lines of code.

//$ Easier to Work with State: 
//# RTK uses a tool called "Immer library" under the hood, which allows us to write state changes like we're mutating the state directly. but it still follows Redux's rule of immutability (not changing the original state).

//$ Built-in Async Handling /Better Async Logic:
//# Handling async tasks, like fetching data, is much simpler with RtK "createAsyncThunk". It automatically handles loading, success, and error state , so we don't have to write all that manually.

//$ Great Default:
//# RTK sets up Redux DevTools, middleware, and other configuration , so we can focus on building our app instead of setup.
