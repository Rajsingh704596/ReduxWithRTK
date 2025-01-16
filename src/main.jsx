import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import './Redux/Store.jsx'
import { Provider } from 'react-redux'
import { stores } from './RTK_(ReduxToolKit)/RTK_Store.jsx'
// import { store } from './Redux/Store.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    {/*<Provider store={store}>*/}         {/* wrap the app with provider component and pass redux store to entire app*/}
    <Provider store={stores}>      {/*rtk store */}
    <App />
    </Provider>

  </StrictMode>,
)

//Note store must be single .