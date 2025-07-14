import React from 'react';
import LoginForm from '../components/LoginForm';

import styled from 'styled-components';
import Logo from '@/assets/svgs/logo.svg?react';
import LoginSupportLinks from '../components/LoginSupportLinks';

export default function Login() {
  return (
    <Wrapper>
      <LogoImg />
      <LoginForm />
      <LoginSupportLinks />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.25rem;
  margin: 5.3125rem 1.25rem;
`;

const LogoImg = styled(Logo)`
  width: 146px;
  height: 179px;
`;
