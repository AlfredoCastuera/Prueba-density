import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { store, persistor } from './Redux/store'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react';

import Pokedex from './pages/Pokedex';
import PokemonDetail from './pages/PokemonDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/pokedex"/>,
  },
  {
    path:'/pokedex',
    element: <Pokedex />,
  },
  {
    path:'/pokedex/:name',
    element: <PokemonDetail />
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
)
