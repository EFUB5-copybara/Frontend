import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fontStyleMap } from '@/mypage/components/fontMap';

function WriteQuestion({ question, status, fontId: fontIdProp }) {
  let displayText;

  if (status === 'loading') {
    displayText = '질문을 불러오는 중...';
  } else if (status === 'error') {
    displayText = '질문을 불러올 수 없습니다.';
  } else {
    displayText = `${question}`;
  }

  const [fontId, setFontId] = useState(-1);

  useEffect(() => {
    // 우선순위: prop > localStorage > -1
    const saved = Number(localStorage.getItem('fontId'));
    const resolved =
      typeof fontIdProp === 'number'
        ? fontIdProp
        : Number.isFinite(saved)
        ? saved
        : -1;
    setFontId(resolved);
  }, [fontIdProp]);

  return (
    <Container>
      <Question $fontId={fontId}>{displayText}</Question>
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
  // ${({ theme }) => theme.fonts.nd18SB};
  ${({ $fontId = -1, theme }) =>
    (fontStyleMap[$fontId] || fontStyleMap[-1])({ theme })}
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
`;
