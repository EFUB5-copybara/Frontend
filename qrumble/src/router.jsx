import { createBrowserRouter } from 'react-router-dom';
import HomePage from './home/pages/HomePage';
import FindId from './login/pages/FindId';
import Login from './login/pages/Login';
import NewPassword from './login/pages/NewPassword';
import ResetPassword from './login/pages/ResetPassword';
import SignUp from './login/pages/SignUp';
import Splash from './Splash';

import CommunityPage from './community/pages/CommunityPage';
import ChartPage from './home/pages/ChartPage';
import FortuneCookiePage from './home/pages/FortuneCookiePage';
import MissionPage from './home/pages/MissionPage';
import WritePage from './home/pages/WritePage';
import MainLayout from './layout/MainLayout';
import BookmarkPage from './mypage/pages/BookmarkPage';
import MyInfoPage from './mypage/pages/MyInfoPage';
import MyPage from './mypage/pages/MyPage';
import MyRecordPage from './mypage/pages/MyRecordPage';
import ThemePage from './mypage/pages/ThemePage';
import navigation from './navigations';
import { configRoutes } from './utils/configRoutes';
import { getNavigationItems } from './utils/getNavigationItems';

export const routes = [
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: configRoutes(navigation),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/community',
        element: <CommunityPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/mypage/theme',
        element: <ThemePage />,
      },
    ],
  },

  {
    path: '/find-id',
    element: <FindId />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/reset-password/new',
    element: <NewPassword />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/mypage/info',
    element: <MyInfoPage />,
  },
  {
    path: '/mypage/myrecords',
    element: <MyRecordPage />,
  },
  {
    path: '/mypage/bookmarks',
    element: <BookmarkPage />,
  },
  {
    path: '/home/write',
    element: <WritePage />,
  },
  {
    path: '/home/chart',
    element: <ChartPage />,
  },
  {
    path: '/home/fortune',
    element: <FortuneCookiePage />,
  },
  {
    path: '/home/mission',
    element: <MissionPage />,
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
