import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ConfirmButton from '../components/ConfirmButton';
import LogoImg from '../components/Logo';
import PasswordInput from '../components/PasswordInput';
import BackButton from '../components/BackButton';

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
  font-size: ${({ theme }) => theme.fonts.b18M};
  color: ${({ theme }) => theme.colors.primary};
`;
