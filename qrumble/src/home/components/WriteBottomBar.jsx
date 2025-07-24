import React, { useState } from "react";
import styled from "styled-components";
import HintOImg from "../assets/svgs/hint-o.svg";
import HintXImg from "../assets/svgs/hint-x.svg";
import PublicOImg from "../assets/svgs/public-o.svg";
import PublicXImg from "../assets/svgs/public-x.svg";

function WriteButtonBar({ hintActive, setHintActive }) {
  const [isPublic, setIsPublic] = useState(true);
  const [grammarChecked, setGrammarChecked] = useState(true);

  const handleGrammarCheck = () => {
    setGrammarChecked(false);
  };

  return (
    <BottomBarWrapper>
      <LeftButtonGroup>
        <Button onClick={() => setHintActive((prev) => !prev)}>
          <ButtonImg src={hintActive ? HintOImg : HintXImg} alt="hint" />
        </Button>

        <Button onClick={() => setIsPublic((prev) => !prev)}>
          <ButtonImg src={isPublic ? PublicOImg : PublicXImg} alt="public" />
        </Button>
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
  background-color: transparent;
  padding: none;
  height: 100%;
  position: relative;
`;

const LeftButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RightButtonGroup = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Button = styled.button`
  width: 117px;
  height: 53px;
  padding: 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`;

const ButtonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 또는 fill, contain 실험해보기 */
  border-radius: 100px;
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
  font-family: ${({ theme }) => theme.fonts.c14M};
`;
