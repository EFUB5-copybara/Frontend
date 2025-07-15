import { useState } from 'react';
import styled from 'styled-components';
import BackIcon from '../assets/svgs/btn_back.svg?react';
import ConfirmButton from '../components/ConfirmButton';
import Input from '../components/Input';
import LoginSupportLinks from '../components/LoginSupportLinks';
import LogoImg from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function ResetPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleConfirm = () => {
    navigate('/reset-password/new');
  };

  return (
    <Container>
      <ButtonWrapper>
        <BackButton onClick={handleGoBack} />
      </ButtonWrapper>

      <LogoImg />

      {isSubmitted ? (
        <>
          <TitleWrapper>
            <SubTitle>이메일을 확인해주세요</SubTitle>
            <Subtitle>이메일로 전송된 링크에 접속해주세요</Subtitle>
          </TitleWrapper>
          <ConfirmButton $variant='stroke' onClick={handleConfirm}>
            확인
          </ConfirmButton>
        </>
      ) : (
        <>
          <TitleWrapper>
            <Title>비밀번호 변경</Title>
            <InputButtonWrapper>
              <Input placeholder='이메일을 입력해 주세요.' />
              <ConfirmButton $variant='stroke' onClick={handleSubmit}>
                확인
              </ConfirmButton>
            </InputButtonWrapper>
          </TitleWrapper>
        </>
      )}

      <LoginSupportLinks />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.3125rem 1.25rem;
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
  font-size: ${({ theme }) => theme.fonts.d32SB};
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.d24SB};
`;

const InputButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fonts.b18M};
  color: ${({ theme }) => theme.colors.brown1};
  text-align: center;
`;
