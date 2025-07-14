import React from 'react';
import styled from 'styled-components';

export default function LoginForm() {
  return (
    <FormWrapper>
      <InputWrapper>
        <Input type='text' placeholder='아이디를 입력해 주세요' />
        <Input type='password' placeholder='비밀번호를 입력해 주세요' />
      </InputWrapper>
      <LoginButton>로그인</LoginButton>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 8px;
  border: none;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.brown3};
  outline: none;

  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.body16M};
  &::placeholder {
    color: ${({ theme }) => theme.colors.brown2};
  }
`;

const LoginButton = styled.button`
  padding: 0.75rem 8.375rem;
  border: 0.0625rem solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.title20SB};
  white-space: nowrap;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
