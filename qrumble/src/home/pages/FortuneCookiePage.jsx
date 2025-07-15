import React from "react";
import styled from "styled-components";
import XImg from "../assets/svgs/X.svg";
import bigfortuneImg from "../assets/images/bigfortunecookie.png";

function FortuneCookiePage() {
  return (
    <Background>
      <Container>
        <XButton>
          <img src={XImg} alt="닫기" />
        </XButton>
        <CookieButton>
          <img src={bigfortuneImg} alt="포춘쿠키 버튼" />
        </CookieButton>
        <TouchCookieMsg>쿠키를 터치하세요!</TouchCookieMsg>
        <TextWrapper>
          <Text1>오늘의 포춘 쿠키</Text1>
          <Text2>10P</Text2>
        </TextWrapper>
      </Container>
    </Background>
  );
}

export default FortuneCookiePage;

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 72px 20px 28px 20px;
  width: 320px;
  height: 700px;
  border-radius: 20px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.colors.white};
`;

const XButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const CookieButton = styled.button`
  position: absolute;
  top: 135px;
  left: 53px;
  width: 201px;
  height: 201px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const TouchCookieMsg = styled.span`
  position: absolute;
  top: 336px;
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.typography.body16M};
  color: ${({ theme }) => theme.colors.green};
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 387px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text1 = styled.span`
  font-family: ${({ theme }) => theme.typography.display24SB};
  color: ${({ theme }) => theme.colors.primary};
`;

const Text2 = styled.span`
  font-family: ${({ theme }) => theme.typography.display32SB};
  color: ${({ theme }) => theme.colors.green};
`;
