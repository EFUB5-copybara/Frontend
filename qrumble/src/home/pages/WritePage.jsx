import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import WriteTopBar from '../components/WriteTopBar';
import WriteQuestion from '../components/WriteQuestion';
import WriteBottomBar from '../components/WriteBottomBar';
import HintTagList from '../components/HintTagList';
import AlertModal from '../components/AlertModal';
import background1Img from '../assets/svgs/background1.svg';
import background2Img from '../assets/svgs/background2.svg';
import background3Img from '../assets/svgs/background3.svg';
import { getTodayQuestion, getQuestionHints } from '../api/homepage';
import { createAnswer } from '../api/homepage';

function WritePage() {
  const [hintActive, setHintActive] = useState(false);
  const [text, setText] = useState('');
  const [hintKeywords, setHintKeywords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [todayQuestion, setTodayQuestion] = useState('');

  const [grammarResult, setGrammarResult] = useState(null);

  const MIN_TEXT_LENGTH = 50;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (text.trim().length < MIN_TEXT_LENGTH) {
      setShowModal(true);
      return;
    }

    try {
      const today = new Date().toISOString().slice(0, 10);
      await createAnswer(today, text.trim(), true);
      navigate('/home/chart');
    } catch (error) {
      console.error('답변 저장 중 오류 발생:', error);
      alert('답변 저장에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10); // 나중에 현재 날짜 기반으로 바꿀 수도 있음
        const resQ = await getTodayQuestion();
        const resH = await getQuestionHints(today);
        setTodayQuestion(resQ.content);
        setHintKeywords(resH.map((hint) => hint.content));
      } catch (e) {
        setTodayQuestion('질문을 불러오지 못했습니다.');
        setHintKeywords([]);
      }
    };

    loadContent();
  }, []);

  return (
    <>
      <Container>
        <Top>
          <WriteTopBar onCheck={handleSubmit} textLength={text.trim().length} />
          <WriteQuestion question={todayQuestion} />

          {hintActive && (
            <HintTagList
              hints={hintKeywords}
              onClick={(hint) => setText((prev) => prev + ' #' + hint)}
            />
          )}
          <TextArea value={text} onChange={(e) => setText(e.target.value)} />
        </Top>
        <Bottom>
          <WriteBottomBar
            hintActive={hintActive}
            setHintActive={setHintActive}
            text={text}
            setGrammarResult={setGrammarResult}
          />
        </Bottom>
      </Container>
      {showModal && (
        <AlertModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          message='최소 글자수를 충족하지 못했습니다'
          lengthText={`${text.trim().length}/50`}
        />
      )}
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
  background-image: url(${background1Img});
  background-size: cover;
  background-position: center;
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
  margin-top: 14px;
  width: 320px;
  height: 78px;
  padding: 0;
  border: none;
  resize: none;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
