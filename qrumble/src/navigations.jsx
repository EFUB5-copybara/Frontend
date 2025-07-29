import ChartBarFill from '@/assets/svgs/chart_bar_fill.svg?react';
import ChartBarLine from '@/assets/svgs/chart_bar_line.svg?react';
import CommunityFill from '@/assets/svgs/comment_2_fill.svg?react';
import CommunityLine from '@/assets/svgs/comment_2_line.svg?react';
import HomeFill from '@/assets/svgs/home_4_fill.svg?react';
import HomeLine from '@/assets/svgs/home_4_line.svg?react';
import StoreFill from '@/assets/svgs/store_fill.svg?react';
import StoreLine from '@/assets/svgs/store_line.svg?react';
import UserFill from '@/assets/svgs/user_3_fill.svg?react';
import UserLine from '@/assets/svgs/user_3_line.svg?react';
import CommunityPage from './community/pages/CommunityPage';
import ChartPage from './home/pages/ChartPage';
import HomePage from './home/pages/HomePage';
import MyPage from './mypage/pages/MyPage';

const navigation = [
  {
    path: '/store',
    icon: StoreLine,
    activeIcon: StoreFill,
  },
  {
    path: '/community',
    icon: CommunityLine,
    activeIcon: CommunityFill,
    element: <CommunityPage />,
  },
  {
    path: '/home',
    icon: HomeLine,
    activeIcon: HomeFill,
    element: <HomePage />,
  },
  {
    path: '/chart',
    icon: ChartBarLine,
    activeIcon: ChartBarFill,
    element: <ChartPage />,
  },
  {
    path: '/mypage',
    icon: UserLine,
    activeIcon: UserFill,
    element: <MyPage />,
  },
];

export default navigation;
