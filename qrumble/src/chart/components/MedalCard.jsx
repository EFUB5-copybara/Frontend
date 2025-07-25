import React from "react";
import styled from "styled-components";
import medalImg from "../assets/medal-a.svg";

function MedalCard({ medalType = "A" }) {
  return (
    <StyledMedalCard>
      <MedalLabel>이번 달 성취도</MedalLabel>
      <MedalImg src={medalImg} alt="medal" />
    </StyledMedalCard>
  );
}

const StyledMedalCard = styled.div`
  width: 100%;
  max-width: 320px;
  height: 206px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  background: ${({ theme }) => theme.colors.white};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const MedalImg = styled.img`
  width: 160px;
  height: 160px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
`;

const MedalLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.sub16SB};
  color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 11px;
  left: 13px;
  font-size: 16px;
  line-height: 26px;
  z-index: 1;
`;

export default MedalCard;