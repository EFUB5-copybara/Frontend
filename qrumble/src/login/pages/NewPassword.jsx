import React, { useState } from 'react';
import LogoImg from '../components/Logo';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import BackIcon from '../assets/svgs/btn_back.svg?react';
import ConfirmButton from '../components/ConfirmButton';

export default function NewPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <ButtonWrapper>
        <BackButton onClick={handleGoBack} />
      </ButtonWrapper>
      <LogoImg />
      <FormWrapper>
        {isSubmitted ? (
          <CompleteMessage>
            비밀번호를 변경했습니다
            <br />
            다시 로그인 해주세요
          </CompleteMessage>
        ) : (
          <>
            <InputWrapper>
              <PasswordInput placeholder={'새로운 비밀번호'} />
              <PasswordInput placeholder={'비밀번호 확인'} />
            </InputWrapper>
          </>
        )}
        <ConfirmButton $variant='stroke' onClick={handleSubmit}>
          확인
        </ConfirmButton>
      </FormWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.25rem;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 2.4375rem;
`;

const BackButton = styled(BackIcon)`
  width: 46px;
  height: 46px;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  margin-top: 5.25rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CompleteMessage = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body18M};
  color: ${({ theme }) => theme.colors.primary};
`;
