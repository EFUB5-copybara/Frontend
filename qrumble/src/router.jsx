import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./login/pages/Login";
import HomePage from "./home/pages/HomePage";
import Splash from "./Splash";
import FindId from "./login/pages/FindId";
import ResetPassword from "./login/pages/ResetPassword";
import SignUp from "./login/pages/SignUp";
import NewPassword from "./login/pages/NewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/find-id",
    element: <FindId />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password/new",
    element: <NewPassword />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

export default router;
