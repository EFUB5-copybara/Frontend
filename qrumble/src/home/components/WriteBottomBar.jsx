import React, { useState } from "react";
import styled from "styled-components";
import beforehintImg from "../assets/svgs/pbeforehint.svg";
import afterhintImg from "../assets/svgs/afterhint.svg";

function WriteButtonBar({ hintActive, setHintActive }) {
  const [isPublic, setIsPublic] = useState(true);
  const [grammarChecked, setGrammarChecked] = useState(true);

  const handleGrammarCheck = () => {
    setGrammarChecked(false);
  };

  return (
    <BottomBarWrapper>
      <LeftButtonGroup>
        <HintButton
          onClick={() => setHintActive((prev) => !prev)}
          active={hintActive}
        >
          <ButtonWrapper>
            <HintIcon
              src={hintActive ? afterhintImg : beforehintImg}
              alt="hint"
              active={hintActive}
            />
            <HintText active={hintActive}>Hint</HintText>
          </ButtonWrapper>
        </HintButton>

        <ToggleButton
          onClick={() => setIsPublic((prev) => !prev)}
          active={isPublic}
        >
          <FakeCheckbox active={isPublic} />
          <ToggleText active={isPublic}>
            {isPublic ? "공개" : "비공개"}
          </ToggleText>
        </ToggleButton>
      </LeftButtonGroup>

      <RightButtonGroup>
        <GrammarCheck
          disabled={!grammarChecked}
          onClick={handleGrammarCheck}
          grammarChecked={grammarChecked}
        >
          <CheckText>문법 검사 {grammarChecked ? "1/1" : "0/1"}</CheckText>
        </GrammarCheck>
      </RightButtonGroup>
    </BottomBarWrapper>
  );
}

export default WriteButtonBar;

const BottomBarWrapper = styled.div`
  width: 320px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: none;
  height: 100%;
  position: relative;
`;

const LeftButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RightButtonGroup = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const HintButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  width: 118px;
  height: 53px;
  background-color: #f7f5f3;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-radius: 100px;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
  cursor: pointer;
  color: ${({ active, theme }) =>
    active ? theme.colors.brown1 : theme.colors.brown3};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HintIcon = styled.img`
  width: ${({ active }) => (active ? "33px" : "18px")};
  height: 33px;

  margin-left: ${({ active }) => (active ? "0" : "8px")};
  margin-right: ${({ active }) => (active ? "0" : "8px")};

  margin-top: ${({ active }) => (active ? "0" : "7.5px")}; /* 하단 정렬 핵심 */
`;

const HintText = styled.span`
  font-family: ${({ theme }) => theme.typography.nunitoDisplay18B};
  font-weight: 500;
  color: ${({ active, theme }) =>
    active ? theme.colors.brown1 : theme.colors.brown3};
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 118px;
  height: 53px;
  padding: 8px 14px;
  background-color: #f7f5f3;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 100px;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
  cursor: pointer;
`;

const ToggleText = styled.span`
  font-family: ${({ theme }) => theme.typography.body16M};
  color: ${({ active, theme }) =>
    active ? theme.colors.brown1 : theme.colors.brown3};
`;

const FakeCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 2px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brown1 : theme.colors.white};
  border: 2px solid
    ${({ active, theme }) =>
      active ? theme.colors.brown1 : theme.colors.brown3};
  box-sizing: border-box;
  transition: all 0.2s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    display: ${({ active }) => (active ? "block" : "none")};
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const GrammarCheck = styled.button`
  background-color: ${({ theme, grammarChecked }) =>
    grammarChecked ? theme.colors.brown2 : theme.colors.brown3};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 8px 12px;
  margin: 0;
  border-radius: 8px;
  width: 99px;
  height: 38px;
  white-space: nowrap;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  &:focus {
    outline: none;
  }
`;

const CheckText = styled.span`
  font-family: ${({ theme }) => theme.typography.caption14M};
`;
