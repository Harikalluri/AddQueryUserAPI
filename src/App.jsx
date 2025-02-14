import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Add from './Add'
import Login from './Login';
import Home from './Home';
import Display from './Display';

const router=createBrowserRouter([
  {
    path:"/",
    element:<Login />
  },
  {
    path:"/add",
    element:<Add></Add>
  },{
    path:"/home",
    element:<Home/>
  },
  {
    path:"/display",
    element:<Display/>
  }
])

const App = () => {
  return (
 <RouterProvider router={router}></RouterProvider>
  )
}

export default App
