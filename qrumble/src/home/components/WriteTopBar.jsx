import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import arrowbackImg from "../assets/svgs/arrow_back.svg";
import checkImg from "../assets/svgs/check.svg";
import browncheckImg from "../assets/svgs/browncheck.svg";

function WriteTopBar({ onCheck, textLength }) {
  const isActive = textLength > 0;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <Bar>
      <Button onClick={handleBack}>
        <ArrowIcon src={arrowbackImg} alt="arrow back" />
      </Button>
      <Date>2025.04.02</Date>
      <CheckButton onClick={onCheck} disabled={!isActive}>
        <CheckIcon src={isActive ? browncheckImg : checkImg} alt="check" />
      </CheckButton>
    </Bar>
  );
}

export default WriteTopBar;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  height: 30px;
  margin-bottom: 19px;
  padding: none;
`;

const Button = styled.button`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 0px;
  justify-content: center;
  align-items: center;
`;

const CheckButton = styled.button`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 0px;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const ArrowIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const CheckIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Date = styled.div`
  font-family: ${({ theme }) => theme.fonts.ns14SB};
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
  align-self: flex-end;
`;
