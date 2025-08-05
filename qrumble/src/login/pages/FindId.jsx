import React from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import ConfirmButton from '../components/ConfirmButton';
import LogoImg from '../components/Logo';

import LoginSupportLinks from '../components/LoginSupportLinks';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

export default function FindId() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  return (
    <Container>
      <ButtonWrapper>
        <BackButton onClick={handleGoBack} />
      </ButtonWrapper>
      <LogoImg />
      <TitleWrapper>
        <Title>아이디 찾기</Title>
        <InputButtonWrapper>
          <Input placeholder='가입하신 이메일을 입력해 주세요.' />
          <ConfirmButton $variant='stroke'>확인</ConfirmButton>
        </InputButtonWrapper>
      </TitleWrapper>
      <LoginSupportLinks />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.875rem 1.25rem 0 1.25rem;
  height: 800px;
  background-color: ${({ theme }) => theme.colors.ivory3};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 2.4375rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 4.3125rem;
  margin-bottom: 3.875rem;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.fonts.d32SB};
`;

const InputButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
`;
