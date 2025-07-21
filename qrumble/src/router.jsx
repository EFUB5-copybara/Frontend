import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./login/pages/Login";
import HomePage from "./home/HomePage";
import Splash from "./Splash";
import FindId from "./login/pages/FindId";
import ResetPassword from "./login/pages/ResetPassword";
import SignUp from "./login/pages/SignUp";
import NewPassword from "./login/pages/NewPassword";
import CommunityPopular from "./community/pages/CommunityPopular";
import MyPage from "./mypage/pages/MyPage";
import ThemePage from "./mypage/pages/ThemePage";

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
    path: "/community",
    element: <CommunityPopular />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/mypage/theme",
    element: <ThemePage />,
  },
]);

export default router;
