import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import LandingPage from './LandingPage';
import { AppWrapper } from './Components/AppWrapper';

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
    element: <AppWrapper/>
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
