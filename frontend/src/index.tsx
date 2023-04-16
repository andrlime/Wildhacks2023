import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import LandingPage from './LandingPage';
import { AppWrapper } from './Components/AppWrapper';
import MapPage from './MapPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MapPage/>,
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
    path: "/formtest",
    element: <AppWrapper/>
  },
  {
    path: "*",
    element: <App/>,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <RouterProvider router={router}/>
);
