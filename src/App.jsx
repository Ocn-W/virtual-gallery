import './App.scss';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/routes';
import { initialOptions } from './components/paypal';
import Home from './components/home'

export default function App() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <RouterProvider fallbackElement={<Home/>} router={router} />
    </PayPalScriptProvider>
  )
}
