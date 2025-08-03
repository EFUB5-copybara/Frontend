import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import LoginSupportLinks from '../components/LoginSupportLinks';
import LogoImg from '../components/Logo';

export default function Login() {
  useRedirectIfLoggedIn();

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
