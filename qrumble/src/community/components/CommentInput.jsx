import React, { useState } from 'react';
import styled from 'styled-components';
import SendIc from '@/community/assets/svgs/send.svg?react';
import { addComment } from '../api/community';

export default function CommentInput({ postId, onAdded }) {
  console.log('postId', postId);
  const [inputValue, setInputValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    const content = inputValue.trim();
    if (!content || submitting) return;

    try {
      setSubmitting(true);
      console.log('보내는 postId', postId);
      await addComment(postId, content);
      setInputValue('');
      onAdded?.();
    } catch (e) {
      console.error('댓글 등록 실패:', e);
      alert(e.response?.data?.message ?? '댓글 등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <InputWrapper>
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder='댓글 남기기'
        disabled={submitting}
      />
      {inputValue.trim().length > 0 && (
        <SendButton
          onClick={handleSend}
          disabled={submitting}
          aria-label='댓글 등록'>
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
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SendIcon = styled(SendIc)`
  width: 24px;
  height: 24px;
`;
