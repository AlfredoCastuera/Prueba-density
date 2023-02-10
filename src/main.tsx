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

import { createTheme, ThemeProvider } from '@mui/system';

import Pokedex from './pages/Pokedex';
import Counter from './pages/Counter'
import PokemonDetail from './pages/PokemonDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path:'/pokedex',
    element: <Pokedex />,
  },
  {
    path:'/pokedex/:name',
    element: <PokemonDetail />
  },
  {
    path:'/counter',
    element: <Counter />
  }
]);

export const theme = createTheme()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
)
