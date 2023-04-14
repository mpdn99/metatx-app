import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mint from './pages/Mint';
import Transfer from './pages/Transfer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mint />,
  },
  {
    path: "/transfer",
    element: <Transfer />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
