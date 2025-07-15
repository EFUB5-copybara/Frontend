import React from "react";
import styled from "styled-components";
import polygonIcon from "../assets/svgs/polygon.svg";

function MonthSelector({ year, month, onClick }) {
  return (
    <Wrapper>
      <MonthButton onClick={onClick}>
        <DateText>
          {year}.{String(month).padStart(2, "0")}
        </DateText>
        <PolygonIcon src={polygonIcon} alt="polygon icon" />
      </MonthButton>
    </Wrapper>
  );
}

export default MonthSelector;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const MonthButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  outline: none;

  &:focus {
    outline: none;
  }
`;

const DateText = styled.span`
  font-family: ${({ theme }) => theme.fonts.nd18SB};
  color: ${({ theme }) => theme.colors.black};
`;

const PolygonIcon = styled.img`
  width: 10px;
`;
