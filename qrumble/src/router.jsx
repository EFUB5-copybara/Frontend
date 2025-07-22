import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./login/pages/Login";
import HomePage from "./home/pages/HomePage";
import Splash from "./Splash";
import FindId from "./login/pages/FindId";
import ResetPassword from "./login/pages/ResetPassword";
import SignUp from "./login/pages/SignUp";
import NewPassword from "./login/pages/NewPassword";
import CommunityPopular from "./community/pages/CommunityPopular";
import MyPage from "./mypage/pages/MyPage";
import ThemePage from "./mypage/pages/ThemePage";
import MyInfoPage from "./mypage/pages/MyInfoPage";
import MyRecordPage from "./mypage/pages/MyRecordPage";
import BookmarkPage from "./mypage/pages/BookmarkPage";
import ChartPage from "./home/pages/ChartPage";
import FortuneCookiePage from "./home/pages/FortuneCookiePage";
import WritePage from "./home/pages/WritePage";
import MissionPage from "./home/pages/MissionPage";

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
  {
    path: "/mypage/info",
    element: <MyInfoPage />,
  },
  {
    path: "/mypage/myrecords",
    element: <MyRecordPage />,
  },
  {
    path: "/mypage/bookmarks",
    element: <BookmarkPage />,
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
  {
    path: "/home/mission",
    element: <MissionPage />,
  },
]);

export default router;
