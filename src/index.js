import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import PageRouters from './Routers'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import configureStore from './Redux/store'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <CookiesProvider>
      <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      <BrowserRouter>
        <Provider store={configureStore()}>
          <PageRouters />
        </Provider>
      </BrowserRouter>
    </CookiesProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
