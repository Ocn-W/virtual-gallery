import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Root from './components/routes/root';
import Home from './components/home';
import App from './App';
import VirtualGallery from './components/virtual-gallery';
import Checkout from './components/checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
  children: [
  {
    path: '/gallery',
    element: <VirtualGallery/>,
  },
  {
    path: '/checkout',
    element: <Checkout/>,
  },],},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)