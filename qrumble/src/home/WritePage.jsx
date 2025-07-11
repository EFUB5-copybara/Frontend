import React, { useState } from "react";
import styled from "styled-components";
import WriteTopBar from "./components/WriteTopBar";
import WriteQuestion from "./components/WriteQuestion";
import WriteBottomBar from "./components/WriteBottomBar";
import HintTagList from "./components/HintTagList";

function WritePage() {
  const [hintActive, setHintActive] = useState(false);
  const [text, setText] = useState("");
  const hintKeywords = ["cafe", "game", "friend"];
  const [showModal, setShowModal] = useState(false);

  const MIN_TEXT_LENGTH = 50;

  const handleSubmit = () => {
    if (text.trim().length < MIN_TEXT_LENGTH) {
      setShowModal(true);
      return;
    } else {
      // 여기에 실제 제출 처리 로직
      console.log("제출 성공");
    }
  };

  return (
    <>
      {showModal && (
        <ModalOverlay>
          <ModalBox>
            <CloseButton onClick={() => setShowModal(false)}>✕</CloseButton>
            <ModalText>최소 글자수를 충족하지 못했습니다</ModalText>
            <LengthText>{text.trim().length}/50</LengthText>
            <ConfirmButton onClick={() => setShowModal(false)}>
              확인
            </ConfirmButton>
          </ModalBox>
        </ModalOverlay>
      )}

      <Container>
        <Top>
          <WriteTopBar onCheck={handleSubmit} textLength={text.trim().length} />
          <WriteQuestion />
          {hintActive && (
            <HintTagList
              hints={hintKeywords}
              onClick={(hint) => setText((prev) => prev + " #" + hint)}
            />
          )}
          <TextArea value={text} onChange={(e) => setText(e.target.value)} />
        </Top>
        <Bottom>
          <WriteBottomBar
            hintActive={hintActive}
            setHintActive={setHintActive}
          />
        </Bottom>
      </Container>
    </>
  );
}

export default WritePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 800px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  padding: 50px 20px 0 20px;
  flex-direction: column;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 24px 20px;
`;

const TextArea = styled.textarea`
  width: 320px;
  height: 78px;
  padding: 0;
  border: none;
  resize: none;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    outline: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalBox = styled.div`
  width: 246px;
  height: 117px;
  padding: 28px 38px;
  background-color: white;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  padding: 0;
  font-size: 18px;
  cursor: pointer;
`;

const ModalText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.typography.body16B};
  margin: 0;
  white-space: nowrap;
  width: 100%;
`;

const LengthText = styled.p`
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.typography.caption14M};
  margin: 0 0 20px 0;
`;

const ConfirmButton = styled.button`
  background-color: ${({ theme }) => theme.colors.brown1};
  font-family: ${({ theme }) => theme.typography.title20SB};
  color: white;
  border: none;
  border-radius: 10px;
  width: 246px;
  height: 51px;
  padding: 12px 0 11px 0;
  cursor: pointer;
`;
