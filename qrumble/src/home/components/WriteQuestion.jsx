import React, { useState } from 'react';
import styled from 'styled-components';

function WriteQuestion({ question, status }) {
  if (status === 'loading')
    return (
      <Container>
        <Question>질문을 불러오는 중...</Question>
      </Container>
    );
  if (status === 'error')
    return (
      <Container>
        <Question>질문을 불러올 수 없습니다.</Question>
      </Container>
    );
  return (
    <Container>
      <Question>{question}</Question>
    </Container>
  );
}

export default WriteQuestion;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 19px;
  border-bottom: 1px solid black;
`;

const Question = styled.div`
  ${({ theme }) => theme.fonts.nd18SB};
  color: ${({ theme }) => theme.colors.black};
`;
