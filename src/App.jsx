import './App.scss';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import Checkout from './components/checkout';
import VirtualGallery from './components/virtual-gallery';
import Navigation from './components/navigation';
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


export default function App() {
  return (
    <>
    <Navigation/>
    <Root/>
    <Outlet/>
    </>
  )
}
