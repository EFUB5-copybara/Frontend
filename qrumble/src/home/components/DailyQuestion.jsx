import React from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/image/chevronright.svg";

function DailyQuestion({
  question = "Q. How was your relationship with your friends?",
  onClick,
}) {
  return (
    <Wrapper>
      <QuestionText>{question}</QuestionText>
      <AnswerButton onClick={onClick}>
        답변하러 가기
        <Icon src={arrowIcon} alt="arrow" />
      </AnswerButton>
    </Wrapper>
  );
}

export default DailyQuestion;

const Wrapper = styled.div`
  width: 100%;
  height: 96px;
  border-radius: 20px;
  padding: 14px 15px 30px 16px;
  background: linear-gradient(102deg, #dbc4b1 0%, #fff8e8 100%);
  border: 1px solid ${({ theme }) => theme.colors.black};
  position: relative;
  box-sizing: border-box;
`;

const QuestionText = styled.div`
  ${({ theme }) => theme.typography.body16M};
  color: ${({ theme }) => theme.colors.black};
`;

const AnswerButton = styled.button`
  position: absolute;
  bottom: 9px;
  right: 19px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  padding: 0;
  border: none;
  ${({ theme }) => theme.typography.caption12M};
  color: ${({ theme }) => theme.colors.brown1};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
