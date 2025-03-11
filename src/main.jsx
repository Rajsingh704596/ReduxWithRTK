import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import './Redux/Store.jsx'
// import { store } from './Redux/Store.jsx'

import { Provider } from 'react-redux'
import { store } from './RTK_(ReduxToolKit)/RTK_Query/RTKQuery_Store.jsx'
// import { stores } from './RTK_(ReduxToolKit)/RTK_Store.jsx'

// import { ApiProvider } from '@reduxjs/toolkit/query/react'             // {/* this is the way without redux we use RTK Query */} 
// import apiSlice from './RTK_(ReduxToolKit)/RTK_Query/apiSlice.jsx' 

 


createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    {/*<Provider store={store}>*/}         {/* wrap the app with provider component and pass redux store to entire app*/}
    {/* <Provider store={stores}> */}      {/* rtk store */}
    {/*<ApiProvider api={apiSlice}> */}       {/* this is the way without redux we use RTK Query */} 
    <Provider store={store}>                {/* with React Redux store inject where RTK Query inject*/}
    <App />
    </Provider>
    {/* </ApiProvider> */}
    {/* </Provider> */}

  </StrictMode>,
)

//Note store must be single .