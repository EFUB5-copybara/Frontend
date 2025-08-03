import { createBrowserRouter } from 'react-router-dom';
import Splash from './Splash';

import FindId from './login/pages/FindId';
import Login from './login/pages/Login';
import NewPassword from './login/pages/NewPassword';
import ResetPassword from './login/pages/ResetPassword';
import SignUp from './login/pages/SignUp';

import FortuneCookiePage from './home/pages/FortuneCookiePage';
import MissionPage from './home/pages/MissionPage';
import WritePage from './home/pages/WritePage';
import ChartPage from './home/pages/ChartPage';

import BookmarkPage from './mypage/pages/BookmarkPage';
import MyInfoPage from './mypage/pages/MyInfoPage';
import MyRecordPage from './mypage/pages/MyRecordPage';
import ThemePage from './mypage/pages/ThemePage';

import CommunityDetailPage from './community/pages/CommunityDetailPage';

import ReportPage from './report/pages/ReportPage';

import ShopPage from './shop/pages/ShopPage';

import MainLayout from './layout/MainLayout';

import UserProfilePage from './community/pages/UserProfilePage';
import HomePage from './home/pages/HomePage';
import CommunityLayout from './layout/CommunityLayout';
import navigation from './navigations';
import { configRoutes } from './utils/configRoutes';
import { getNavigationItems } from './utils/getNavigationItems';
import ThemePage from './mypage/pages/ThemePage';

export const routes = [
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      ...configRoutes(navigation),
      {
        path: 'user-profile/:userId',
        element: <UserProfilePage />,
      },
      {
        path: '/mypage/theme',
        element: <ThemePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
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
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/mypage/info',
    element: <MyInfoPage />,
  },
  {
    path: '/mypage/record',
    element: <MyRecordPage />,
  },
  {
    path: '/mypage/bookmarks',
    element: <BookmarkPage />,
  },
  {
    path: '/mypage/theme',
    element: <ThemePage />,
  },
  {
    path: '/home/write',
    element: <WritePage />,
  },
  {
    path: '/home/fortune',
    element: <FortuneCookiePage />,
  },
  {
    path: '/home/detail',
    element: <ChartPage />,
  },
  {
    path: '/home/mission',
    element: <MissionPage />,
  },

  {
    path: '/community/:id',
    element: <CommunityLayout />,
    children: [
      {
        index: true,
        element: <CommunityDetailPage />,
      },
    ],
  },
  {
    path: '/report',
    element: <ReportPage />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
export const navigationItems = getNavigationItems(navigation);
