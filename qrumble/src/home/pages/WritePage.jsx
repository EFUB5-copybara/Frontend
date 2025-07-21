import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WriteTopBar from "../components/WriteTopBar";
import WriteQuestion from "../components/WriteQuestion";
import WriteBottomBar from "../components/WriteBottomBar";
import HintTagList from "../components/HintTagList";
import AlertModal from "../components/AlertModal";

function WritePage() {
  const [hintActive, setHintActive] = useState(false);
  const [text, setText] = useState("");
  const hintKeywords = ["cafe", "game", "friend"];
  const [showModal, setShowModal] = useState(false);

  const MIN_TEXT_LENGTH = 50;

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (text.trim().length < MIN_TEXT_LENGTH) {
      setShowModal(true);
      return;
    } else {
      navigate("/home/chart");
    }
  };

  return (
    <>
      {showModal && (
        <AlertModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          message="최소 글자수를 충족하지 못했습니다"
          lengthText={`${text.trim().length}/50`}
        />
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
