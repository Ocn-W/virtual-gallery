import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/routes';
import Home from './components/home'

export default function App() {
  return (
    <RouterProvider fallbackElement={<Home/>} router={router} />
  )
}
