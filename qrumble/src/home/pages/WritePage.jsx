import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  createAnswer,
  getDailyQuestion,
  getQuestionHints,
} from '../api/homepage';
import background1Img from '../assets/svgs/background1.svg';
import AlertModal from '../components/AlertModal';
import HintTagList from '../components/HintTagList';
import WriteBottomBar from '../components/WriteBottomBar';
import WriteQuestion from '../components/WriteQuestion';
import WriteTopBar from '../components/WriteTopBar';
import useTodayQuestionStore from '../stores/useTodayQuestionStore';

function WritePage() {
  const [hintActive, setHintActive] = useState(false);
  const [text, setText] = useState('');
  const [hintKeywords, setHintKeywords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { todayQuestion, todayQuestionError } = useTodayQuestionStore();

  const [isPublic, setIsPublic] = useState(true);

  const [grammarResult, setGrammarResult] = useState(null);

  const MIN_TEXT_LENGTH = 50;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (text.trim().length < MIN_TEXT_LENGTH) {
      setShowModal(true);
      return;
    }

    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      console.log('생성날짜: ', today);
      await createAnswer(today, text.trim(), isPublic);
      navigate('/home/detail', { state: { date: today } });
    } catch (error) {
      console.error('답변 저장 중 오류 발생:', error);
      alert('답변 저장에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    const fetchTodayQuestion = async () => {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      try {
        const [data, hint] = await Promise.all([
          getDailyQuestion(formattedDate),
          getQuestionHints(formattedDate),
        ]);
        setTodayQuestion(data.content);
        setHintKeywords(hint.map((hints) => hints.content));

        setTodayQuestionError(null);
      } catch (error) {
        setTodayQuestion('');
        const message =
          error.response?.data?.message || '오늘 질문을 불러올 수 없습니다.';
        setTodayQuestionError(message);
      }
    };

    fetchTodayQuestion();
  }, []);

  return (
    <>
      <Container>
        <Top>
          <WriteTopBar onCheck={handleSubmit} textLength={text.trim().length} />
          <WriteQuestion
            question={todayQuestion}
            status={
              todayQuestionError
                ? 'error'
                : !todayQuestion
                ? 'loading'
                : 'success'
            }
          />

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
            isPublic={isPublic}
            setIsPublic={setIsPublic}
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
