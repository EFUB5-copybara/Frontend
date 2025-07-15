import React from "react";
import styled from "styled-components";
import arrowbackImg from "../assets/svgs/arrow_back.svg";
import thumbsupImg from "../assets/svgs/thumbsup.svg";
import eyeImg from "../assets/svgs/eye.svg";
import commentImg from "../assets/svgs/comments.svg";
import shareImg from "../assets/svgs/share.svg";

function ChartPage() {
  return (
    <Background>
      <Container>
        <Button>
          <ArrowIcon src={arrowbackImg} alt="arrow back" />
        </Button>
        <Date>2025.04.02</Date>
        <Wrapper>
          <Question>How was your relationship with your friend?</Question>
          <Answer>
            I felt good to meet my high school friend after a long time. We went
            to a cafe, played games, and had fun together
          </Answer>
          <ChartBottomBar>
            <BottomBtn>
              <BottomBtnImg src={thumbsupImg} alt="like" />
              101
            </BottomBtn>
            <BottomBtn>
              <BottomBtnImg src={eyeImg} alt="eye" />
              101
            </BottomBtn>
            <BottomBtn>
              <BottomBtnImg src={commentImg} alt="comment" />
              101
            </BottomBtn>
            <BottomBtn>
              <BottomBtnImg src={shareImg} alt="share" />
            </BottomBtn>
          </ChartBottomBar>
        </Wrapper>
      </Container>
    </Background>
  );
}

export default ChartPage;

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.ivory3};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 55px 20px 22px 20px;
  width: 320px;
  height: 723px;
  border-radius: 20px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Button = styled.button`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  width: 100%;
  height: auto;
`;

const Date = styled.div`
  position: absolute;
  top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.ns14SB};
  color: ${({ theme }) => theme.colors.green};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 62px 28px 0px 28px;
  position: relative;
  height: 100%;
`;

const Question = styled.div`
  font-family: ${({ theme }) => theme.fonts.nd18SB};
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 19px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brown1};
`;

const Answer = styled.div`
  font-family: ${({ theme }) => theme.fonts.ns16M};
  color: ${({ theme }) => theme.colors.black};
  padding-top: 14px;
`;

const ChartBottomBar = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  height: 40px;
  bottom: 41px;
  justify-content: space-around;
  gap: 20px;
`;

const BottomBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.brown1};
  padding-left: 0px;
  padding-right: 0px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const BottomBtnImg = styled.img`
  width: 20px;
  height: 20px;
`;
