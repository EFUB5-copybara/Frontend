import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationItems } from '@/router';

export default function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  return (
    <Wrapper>
      <IconContainer>
        {navigationItems.map(({ path, icon: Icon, activeIcon: ActiveIcon }) => {
          const isActive = currentPath === path;
          const RenderIcon = isActive ? ActiveIcon : Icon;

          return (
            <IconButton key={path} onClick={() => navigate(path)}>
              <RenderIcon />
            </IconButton>
          );
        })}
      </IconContainer>
    </Wrapper>
  );
}
const Wrapper = styled.nav`
  width: 100%;
  max-width: 360px;
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

const IconContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 16px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;
