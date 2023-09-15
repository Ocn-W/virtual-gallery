import './App.scss';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './components/home'
import VirtualGallery from './components/virtual-gallery';
import Checkout from './components/checkout';
import Navigation from './components/navigation';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="gallery" element={<VirtualGallery />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  )
)

export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
