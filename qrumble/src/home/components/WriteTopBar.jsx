import React from "react";
import styled from "styled-components";
import arrowbackImg from "../../assets/image/arrow_back.svg";
import checkImg from "../../assets/image/check.svg";

function WriteTopBar() {
  return (
    <Bar>
      <Button>
        <ArrowIcon src={arrowbackImg} alt="arrow back" />
      </Button>
      <Date>2025.04.02</Date>
      <Button>
        <CheckIcon src={checkImg} alt="check" />
      </Button>
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
  font-family: ${({ theme }) => theme.typography.nunitoSubtitle14SB};
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
  align-self: flex-end;
`;
