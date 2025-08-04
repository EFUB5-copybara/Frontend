import React, { useState } from 'react';
import styled from 'styled-components';
import EyeIcon from '../assets/svgs/eye_option.svg?react';
import EyeOffIcon from '../assets/svgs/eye_option_off.svg?react';

export default function PasswordInput({ name, value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <InputWrapper>
      <StyledInput
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <ToggleButton type='button' onClick={toggleShowPassword}>
        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
      </ToggleButton>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  position: relative;
  width: 320px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brown3};
  ${({ theme }) => theme.fonts.b16M};
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.brown2};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
  }
  svg {
    width: 42px;
    height: 42px;
  }
`;
