import Logo from '@/assets/svgs/logo.svg?react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Splash = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Container onClick={handleClick}>
      <LogoImg />
    </Container>
  );
};

export default Splash;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled(Logo)`
  width: 146px;
  height: 179px;
  cursor: pointer;
`;
