import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo2 from '../assets/svgs/logo2.svg?react';
import BackIcon from '../assets/svgs/btn_back.svg?react';
import styled from 'styled-components';
import SignUpForm from '../components/SignUpForm';
import ConfirmButton from '../components/ConfirmButton';
import BackButton from '../components/BackButton';

export default function SignUp() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <ButtonWrapper>
        <BackButton onClick={handleGoBack} />
      </ButtonWrapper>
      <Wrapper>
        <LogoImg />
        <SignUpForm />
      </Wrapper>
      <ConfirmButton $variant='fill'>확인</ConfirmButton>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 2.4375rem;
`;
const LogoImg = styled(Logo2)`
  width: 130px;
  height: 147px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  margin-bottom: 8.6875rem;
`;
