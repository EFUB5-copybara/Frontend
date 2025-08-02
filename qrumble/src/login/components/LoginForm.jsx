import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import ConfirmButton from './ConfirmButton';
import axiosInstance from '@/api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/login', form);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <FormWrapper>
      <InputWrapper>
        <Input
          name='id'
          value={form.id}
          onChange={handleChange}
          type='text'
          placeholder='아이디를 입력해 주세요'
        />
        <Input
          name='password'
          value={form.password}
          onChange={handleChange}
          type='password'
          placeholder='비밀번호를 입력해 주세요'
        />
      </InputWrapper>
      <ConfirmButton $variant='stroke' onClick={handleSubmit}>
        로그인
      </ConfirmButton>
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
