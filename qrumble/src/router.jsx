import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './login/pages/Login';
import HomePage from './home/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />,
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
