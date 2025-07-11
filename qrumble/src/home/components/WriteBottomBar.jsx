import React, { useState } from "react";
import styled from "styled-components";

function BottomButtonBar() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <BottomBarWrapper>
      <LeftButtonGroup>
        <HintButton>Hint</HintButton>

        <ToggleButton
          onClick={() => setIsPublic((prev) => !prev)}
          isActive={isPublic}
        >
          <CheckBox type="checkbox" checked={isPublic} readOnly />
          <span>{isPublic ? "공개" : "비공개"}</span>
        </ToggleButton>
      </LeftButtonGroup>

      <CheckResult>문법 검사 1/1</CheckResult>
    </BottomBarWrapper>
  );
}

export default BottomButtonBar;

const BottomBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const LeftButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const HintButton = styled.button`
  display: flex;
  padding: 8px 20px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 100px;
`;

const Icon = styled.img`
  width: 33px;
  height: 33px;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f7f5f3;
  border-radius: 20px;
  padding: 8px 14px;
  border: none;
  font-size: 14px;
  color: ${({ isActive }) => (isActive ? "#7a5e46" : "#bbb")};
  font-weight: 500;
  cursor: pointer;
`;

const CheckBox = styled.input`
  width: 16px;
  height: 16px;
`;

const CheckResult = styled.div`
  background: #a38b73;
  color: white;
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
`;
