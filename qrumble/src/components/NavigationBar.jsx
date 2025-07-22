import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ShopIcon from '@/assets/svgs/store_line.svg?react';
import CommunityIcon from '@/assets/svgs/comment_2_line.svg?react';
import HomeIcon from '@/assets/svgs/home_4_line.svg?react';
import ChartIcon from '@/assets/svgs/chart_bar_line.svg?react';
import UserIcon from '@/assets/svgs/user_3_line.svg?react';
import SelectedShop from '@/assets/svgs/store_fill.svg?react';
import SelectedCommunity from '@/assets/svgs/comment_2_fill.svg?react';
import SelectedHome from '@/assets/svgs/home_4_fill.svg?react';
import SelectedChart from '@/assets/svgs/chart_bar_fill.svg?react';
import SelectedUser from '@/assets/svgs/user_3_fill.svg?react';

export default function NavigationBar({ current, onTabClick }) {
  const navigate = useNavigate();

  const handleTabClick = (tab, path) => {
    onTabClick?.(tab);
    navigate(path);
  };

  return (
    <Wrapper>
      <IconContainer>
        <IconButton
          onClick={() => handleTabClick('shop', '/shop')}
          $active={current === 'shop'}>
          {current === 'shop' ? <SelectedShop /> : <ShopIcon />}
        </IconButton>
        <IconButton
          onClick={() => handleTabClick('community', '/community')}
          $active={current === 'community'}>
          {current === 'community' ? <SelectedCommunity /> : <CommunityIcon />}
        </IconButton>
        <IconButton
          onClick={() => handleTabClick('home', '/home')}
          $active={current === 'home'}>
          {current === 'home' ? <SelectedHome /> : <HomeIcon />}
        </IconButton>
        <IconButton
          onClick={() => handleTabClick('chart', '/chart')}
          $active={current === 'chart'}>
          {current === 'chart' ? <SelectedChart /> : <ChartIcon />}
        </IconButton>
        <IconButton
          onClick={() => handleTabClick('user', '/user')}
          $active={current === 'user'}>
          {current === 'user' ? <SelectedUser /> : <UserIcon />}
        </IconButton>
      </IconContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  height: 65px;
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => theme.colors.brown3};
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 26px;
`;

const IconButton = styled.button`
  padding: 6px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
    fill: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.brown1};
  }
`;
