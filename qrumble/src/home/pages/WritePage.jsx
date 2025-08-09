import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  createAnswer,
  getDailyQuestion,
  getQuestionHints,
} from '../api/homepage';
import AlertModal from '../components/AlertModal';
import HintTagList from '../components/HintTagList';
import WriteBottomBar from '../components/WriteBottomBar';
import WriteQuestion from '../components/WriteQuestion';
import WriteTopBar from '../components/WriteTopBar';
import useTodayQuestionStore from '../stores/useTodayQuestionStore';
import GrammarPopup from '../components/GrammarPopup';
import { format } from 'date-fns';
import { getPaperImage } from '@/mypage/components/paperMap';
import { getPapersList, getFontsList } from '@/shop/api/shopApi';
import { fontStyleMap } from '@/mypage/components/fontMap';

function WritePage() {
  const navigate = useNavigate();

  // 질문/힌트/공개여부/문법결과
  const [hintActive, setHintActive] = useState(false);
  const [hintKeywords, setHintKeywords] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [grammarResult, setGrammarResult] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 질문 텍스트
  const [text, setText] = useState('');

  // 스토어 (setter 누락되어 있던 부분 추가)
  const {
    todayQuestion,
    todayQuestionError,
    setTodayQuestion,
    setTodayQuestionError,
  } = useTodayQuestionStore();

  // 종이/폰트 선택값
  const [selectedPaperId, setSelectedPaperId] = useState(null);
  const [selectedFontId, setSelectedFontId] = useState(-1);

  // 오늘 날짜 문자열
  const todayStr = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);

  // 제출
  const MIN_TEXT_LENGTH = 50;
  const handleSubmit = async () => {
    if (text.trim().length < MIN_TEXT_LENGTH) {
      setShowModal(true);
      return;
    }
    try {
      await createAnswer(todayStr, text.trim(), isPublic);
      navigate('/home/detail', { state: { date: todayStr } });
    } catch (error) {
      console.error('답변 저장 중 오류 발생:', error);
      alert('답변 저장에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 질문/힌트 로드
  useEffect(() => {
    const load = async () => {
      try {
        const [q, hints] = await Promise.all([
          getDailyQuestion(todayStr),
          getQuestionHints(todayStr),
        ]);
        setTodayQuestion(q.content);
        setHintKeywords(hints.map((h) => h.content));
        setTodayQuestionError(null);
      } catch (error) {
        setTodayQuestion('');
        const message =
          error.response?.data?.message || '오늘 질문을 불러올 수 없습니다.';
        setTodayQuestionError(message);
      }
    };
    load();
  }, [todayStr, setTodayQuestion, setTodayQuestionError]);

  // 종이 로드
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const papers = await getPapersList();
        const selected = papers.find((p) => p.selected);
        if (selected) setSelectedPaperId(selected.id);
      } catch (e) {
        console.error('종이 목록 불러오기 실패:', e);
      }
    };
    fetchPapers();
  }, []);

  // 폰트 로드(로컬 우선 → 서버 selected → 기본 -1)
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const saved = Number(localStorage.getItem('fontId'));
        if (Number.isFinite(saved)) {
          setSelectedFontId(saved);
        }
        const fonts = await getFontsList();
        if (!Number.isFinite(saved)) {
          const selected = fonts.find((f) => f.selected);
          setSelectedFontId(selected ? selected.id : -1);
        }
      } catch (e) {
        console.error('폰트 목록 불러오기 실패:', e);
      }
    };
    fetchFonts();
  }, []);

  // 문법 팝업: 제안 선택 반영
  const handleErrorClick = (e, error) => {
    const rect = e.target.getBoundingClientRect();
    setPopupInfo({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
      message: error.message,
      replacements: error.replacements,
      offset: error.offset,
      length: error.length,
    });
  };

  const handleReplacementSelect = (replacement) => {
    const { offset, length } = popupInfo;
    const newText =
      text.slice(0, offset) + replacement + text.slice(offset + length);
    setText(newText);

    const delta = replacement.length - length;
    const updatedErrors = grammarResult.errors
      .filter((err) => !(err.offset === offset && err.length === length))
      .map((err) =>
        err.offset > offset ? { ...err, offset: err.offset + delta } : err
      );

    setGrammarResult((prev) => ({ ...prev, errors: updatedErrors }));
    setPopupInfo(null);
  };

  const status = todayQuestionError
    ? 'error'
    : !todayQuestion
    ? 'loading'
    : 'success';

  return (
    <>
      <Container $paperId={selectedPaperId}>
        <Top>
          <WriteTopBar onCheck={handleSubmit} textLength={text.trim().length} />

          <WriteQuestion
            question={todayQuestion}
            status={status}
            fontId={selectedFontId}
          />

          {hintActive && (
            <HintTagList
              hints={hintKeywords}
              onClick={(hint) => setText((prev) => prev + ' #' + hint)}
            />
          )}

          <TextArea
            $fontId={selectedFontId}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {grammarResult && grammarResult.errors.length > 0 && (
            <StyledTextOutput $fontId={selectedFontId}>
              {renderWithHighlights(
                text,
                grammarResult.errors,
                handleErrorClick
              )}
            </StyledTextOutput>
          )}

          {popupInfo && (
            <GrammarPopup
              x={popupInfo.x}
              y={popupInfo.y}
              message={popupInfo.message}
              replacements={popupInfo.replacements}
              onSelect={handleReplacementSelect}
            />
          )}
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

/* ===== styled ===== */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 800px;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: ${({ $paperId }) =>
    $paperId ? `url(${getPaperImage($paperId)})` : 'none'};
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
  ${({ $fontId = -1, theme }) =>
    $fontId === -1
      ? theme.fonts.ns16M
      : (fontStyleMap[$fontId] || fontStyleMap[-1])({ theme })}
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const StyledTextOutput = styled.div`
  margin-top: 12px;
  width: 320px;
  min-height: 78px;
  padding: 8px;
  ${({ $fontId = -1, theme }) =>
    $fontId === -1
      ? theme.fonts.ns16M
      : (fontStyleMap[Number($fontId)] || fontStyleMap[-1])({ theme })}
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #ddd;
  border-radius: 8px;
  white-space: pre-wrap;
  word-break: break-word;
  color: ${({ theme }) => theme.colors.black};
`;

/* ===== utils ===== */

function renderWithHighlights(text, errors, onClickError) {
  let result = [];
  let lastIndex = 0;
  errors.forEach((error, i) => {
    const { offset, length } = error;
    const before = text.slice(lastIndex, offset);
    const wrong = text.slice(offset, offset + length);
    result.push(<span key={`before-${i}`}>{before}</span>);
    result.push(
      <span
        key={`error-${i}`}
        style={{ borderBottom: '2px dashed red', cursor: 'pointer' }}
        onClick={(e) => onClickError(e, error)}
      >
        {wrong}
      </span>
    );
    lastIndex = offset + length;
  });
  result.push(<span key='after'>{text.slice(lastIndex)}</span>);
  return result;
}
