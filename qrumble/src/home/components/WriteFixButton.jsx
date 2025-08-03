import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import plusImg from "../assets/svgs/Plus.svg";

function WirteFixButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/home/write")}>
      <PlusImg src={plusImg} alt="plus" />
    </Button>
  );
}

export default WirteFixButton;

const Button = styled.button`
  position: absolute;
  top: 654px;
  right: 11px;
  width: 72px;
  height: 72px;
  border-radius: 1000px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    background-color: rgba(92, 57, 20, 1);
  }

  &:active {
    background-color: rgba(78, 46, 13, 1);
  }
`;

const PlusImg = styled.img`
  width: 40px;
  height: 40px;
`;
