import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import ConfirmButton from './ConfirmButton';

export default function LoginForm() {
  return (
    <FormWrapper>
      <InputWrapper>
        <Input type='text' placeholder='아이디를 입력해 주세요' />
        <Input type='password' placeholder='비밀번호를 입력해 주세요' />
      </InputWrapper>
      <ConfirmButton $variant='stroke'>로그인</ConfirmButton>
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
