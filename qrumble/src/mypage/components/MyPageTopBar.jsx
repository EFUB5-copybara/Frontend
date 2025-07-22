import React from "react";
import styled from "styled-components";
import arrowbackImg from "../assets/arrow_back.svg";

function MyPageTopBar({ title }) {
  return (
    <Container>
      <BackButton>
        <ButtonImg src={arrowbackImg} alt="back button" />
      </BackButton>
      <TitleText>{title}</TitleText>
    </Container>
  );
}

export default MyPageTopBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 105px;
  padding-top: 59px;
`;

const TitleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.t20SB};
`;

const BackButton = styled.button`
  position: absolute;
  top: 59px;
  left: 20px;
  width: 46px;
  height: 46px;
  padding: 8px;
`;

const ButtonImg = styled.img``;
