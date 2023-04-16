import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from './Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import LandingPage from './LandingPage';
import { Home } from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
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
    path: "/home",
    element: <Home/>
  },
  {
    path: "*",
    element: <LandingPage/>,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
