import React, { useState } from 'react';
import styled from 'styled-components';
import SendIc from '@/community/assets/svgs/send.svg?react';

export default function CommentInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    console.log('보낸 내용:', inputValue);
    setInputValue('');
  };

  return (
    <InputWrapper>
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder='댓글 남기기'
      />
      {inputValue.trim().length > 0 && (
        <SendButton onClick={handleSend}>
          <SendIcon />
        </SendButton>
      )}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  width: 100%;
  z-index: 10;
`;

const Input = styled.input`
  ${({ theme }) => theme.fonts.b16M}
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  border-radius: 8px;
`;

const SendButton = styled.button`
  position: absolute;
  background-color: transparent;
  right: 10px;
  top: 55%;
  transform: translateY(-50%);

  border: none;
  padding: 0;
  cursor: pointer;
`;

const SendIcon = styled(SendIc)`
  width: 24px;
  height: 24px;
`;
