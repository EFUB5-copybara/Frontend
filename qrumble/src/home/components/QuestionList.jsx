import React from "react";
import styled from "styled-components";
import likeImg from "../assets/svgs/like.svg";
import commentImg from "../assets/svgs/question-comments.svg";

const dummyQuestions = [
  {
    id: 1,
    date: "2025.04.02",
    question: "How was your relationship with your friends?",
    answer: "I met my high school friend and we had a great time.",
  },
  {
    id: 2,
    date: "2025.04.01",
    question: "What made you smile today?",
    answer: "I saw a cute dog while walking to school.",
  },
  {
    id: 3,
    date: "2025.03.31",
    question: "What was the most challenging part of your day?",
    answer: "I had a tough math test but managed to stay focused.",
  },
];

function QuestionList({ questions = dummyQuestions }) {
  return (
    <Wrapper>
      {questions.map((item) => (
        <QuestionCard key={item.id}>
          <Header>
            <Label>질문</Label>
            <DateText>{item.date}</DateText>
          </Header>
          <QuestionText>{item.question}</QuestionText>
          <Bottom>
            <BottomItem>
              <BottomImg src={likeImg} alt="like" />
              공감
            </BottomItem>
            <BottomItem>
              <BottomImg src={commentImg} alt="comment" />
              101
            </BottomItem>
          </Bottom>
        </QuestionCard>
      ))}
    </Wrapper>
  );
}

export default QuestionList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QuestionCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 14px 16px 2px 16px;
  border: 1px solid black;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.b16M};
  color: ${({ theme }) => theme.colors.black};
`;

const DateText = styled.span`
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.green};
`;

const QuestionText = styled.div`
  font-family: ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.black};
  margin: 4px 0px;
`;

const Bottom = styled.div`
  font-family: ${({ theme }) => theme.fonts.ns14M};
  color: ${({ theme }) => theme.colors.green};
  height: 38px;
  display: flex;
  justify-content: end;
`;

const BottomItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.green};
  padding: 10px 6px 14px 6px;
  border: none;
`;

const BottomImg = styled.img`
  width: 14px;
  height: 14px;
`;
