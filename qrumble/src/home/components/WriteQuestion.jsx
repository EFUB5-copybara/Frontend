import React from "react";
import styled from "styled-components";

function WriteQuestion() {
  return (
    <Container>
      <Question>How was your relationship with your friends?</Question>
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
  font-family: ${({ theme }) => theme.typography.nunitoDisplay18SB};
  color: ${({ theme }) => theme.colors.black};
`;
