import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./login/pages/Login";
import HomePage from "./home/pages/HomePage";
import Splash from "./Splash";
import FindId from "./login/pages/FindId";
import ResetPassword from "./login/pages/ResetPassword";
import SignUp from "./login/pages/SignUp";
import NewPassword from "./login/pages/NewPassword";
import WritePage from "./home/pages/WritePage";
import ChartPage from "./home/pages/ChartPage";
import FortuneCookiePage from "./home/pages/FortuneCookiePage";

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
  {
    path: "/home/write",
    element: <WritePage />,
  },
  {
    path: "/home/chart",
    element: <ChartPage />,
  },
  {
    path: "/home/fortune",
    element: <FortuneCookiePage />,
  },
]);

export default router;
