import React, { useState } from 'react';
import styled from 'styled-components';

function WriteQuestion({ question, status }) {
  let displayText;

  if (status === 'loading') {
    displayText = '질문을 불러오는 중...';
  } else if (status === 'error') {
    displayText = '질문을 불러올 수 없습니다.';
  } else {
    displayText = `${question}`;
  }

  return (
    <Container>
      <Question>{displayText}</Question>
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
