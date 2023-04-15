import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "*",
    element: <App/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
