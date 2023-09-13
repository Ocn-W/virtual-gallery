import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import VirtualGallery from './components/virtual-gallery';
import Checkout from './components/checkout';
import Root from './components/routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
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
  <RouterProvider router={router} />
)