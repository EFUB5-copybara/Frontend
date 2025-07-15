import React from 'react';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import LoginSupportLinks from '../components/LoginSupportLinks';
import LogoImg from '../components/Logo';

export default function Login() {
  return (
    <Container>
      <LogoImg />
      <LoginForm />
      <LoginSupportLinks />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.25rem;
  margin: 5.3125rem 1.25rem;
`;
