import { createBrowserRouter } from "react-router-dom";
import CommunityPopular from "./community/pages/CommunityPopular";
import ChartPage from "./home/pages/ChartPage";
import FortuneCookiePage from "./home/pages/FortuneCookiePage";
import HomePage from "./home/pages/HomePage";
import WritePage from "./home/pages/WritePage";
import MissionPage from "./home/pages/MissionPage";
import FindId from "./login/pages/FindId";
import Login from "./login/pages/Login";
import NewPassword from "./login/pages/NewPassword";
import ResetPassword from "./login/pages/ResetPassword";
import SignUp from "./login/pages/SignUp";
import Splash from "./Splash";

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
