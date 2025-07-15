import React from 'react';
import Input from './Input';
import styled from 'styled-components';
import PasswordInput from './PasswordInput';

export default function SignUpForm() {
  return (
    <Container>
      <IdWrapper>
        <Input placeholder='아이디' />
        <CheckButton>중복확인</CheckButton>
      </IdWrapper>
      <PasswordInput placeholder={'비밀번호'}></PasswordInput>
      <PasswordInput placeholder={'비밀번호 확인'}></PasswordInput>
      <Input placeholder='이메일 입력' />
      <Info>
        ※ 앱의 기능을 모두 이용하기 위해선 정확한 개인정보 입력이 필요합니다
      </Info>
    </Container>
  );
}
const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
  justify-content: space-between;
`;

const IdWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;

const CheckButton = styled.button`
  width: 5.4375rem;
  height: 3.125rem;
  padding: 1rem 0.9375rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.brown1};
  color: white;
  white-space: nowrap;
`;

const Info = styled.p`
  font-size: ${({ theme }) => theme.typography.caption14M};
  color: ${({ theme }) => theme.colors.brown2};
`;
