import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo2 from '../assets/svgs/logo2.svg?react';
import BackButton from '../components/BackButton';
import SignUpForm from '../components/SignUpForm';
import ConfirmButton from '../components/ConfirmButton';
import axiosInstance from '@/api/axiosInstance';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';

export default function SignUp() {
  useRedirectIfLoggedIn();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
  });

  const [localErrors, setLocalErrors] = useState({});

  const validateField = (name, value, updatedForm = form) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!/^[a-zA-Z0-9]{5,15}$/.test(value)) {
          error = '· 5~15자의 영문과 숫자만 사용 가능합니다.';
        }
        break;

      case 'password':
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
          error = '· 숫자, 문자, 특수문자 포함 8자 이상';
        }
        break;

      case 'confirmPassword':
        if (value !== updatedForm.password) {
          error = '· 비밀번호가 일치하지 않습니다.';
        }
        break;

      case 'nickname':
        if (value.length < 2 || value.length > 10) {
          error = '· 2~10자 사이로 입력해주세요.';
        }
        break;

      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = '· 올바른 이메일 형식이 아닙니다.';
        }
        break;

      default:
        break;
    }

    setLocalErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
    validateField(name, value, updatedForm);
  };

  const handleCheckUsername = async () => {
    alert(`아이디 ${form.username} 중복 확인 로직`);
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axiosInstance.post('/auth/signup', form);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || '회원가입 실패');
    }
  };

  const handleGoBack = () => navigate(-1);

  return (
    <Container>
      <ButtonWrapper>
        <BackButton onClick={handleGoBack} />
      </ButtonWrapper>
      <Wrapper>
        <LogoImg />
        <SignUpForm
          form={form}
          errors={localErrors}
          onChange={handleChange}
          onCheckUsername={handleCheckUsername}
        />
      </Wrapper>
      <FixedConfirmButton $variant='fill' onClick={handleSubmit}>
        확인
      </FixedConfirmButton>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1.25rem;
  background-color: ${({ theme }) => theme.colors.ivory3};
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

const FixedConfirmButton = styled(ConfirmButton)`
  position: absolute;
  bottom: 5rem;
  left: 50%;
  z-index: 40;
  transform: translateX(-50%);
`;
