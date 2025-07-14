import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './login/pages/Login';
import HomePage from './home/HomePage';
import Splash from './Splash';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);

export default router;
