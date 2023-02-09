import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { store } from './Redux/store'
import { Provider } from 'react-redux'

import Home from './pages/Home';
import Counter from './pages/Counter'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path:'/home',
    element: <Home />
  },
  {
    path:'/counter',
    element: <Counter />
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
)
