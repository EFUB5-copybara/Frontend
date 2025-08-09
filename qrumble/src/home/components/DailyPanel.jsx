import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  DayCell,
  DateBox,
  DateText,
  CookieIcon,
} from './styles/CalendarStyles';
import cookieImg from '../assets/svgs/cookie.svg';
import likeImg from '../assets/svgs/like.svg';
import commentImg from '../assets/svgs/question-comments.svg';
import ItemButtons from './ItemButtons';
import AnswerCard from './AnswerCard';
import { getMyItems } from '@/shop/api/shopApi';
import { useNavigate } from 'react-router-dom';
import useTodayQuestionStore from '../stores/useTodayQuestionStore';
import useDailyQuestionStore from '../stores/useDailyQuestionStore';
import { getMonthlyAnswerStatus } from '../api/homepage';
import { format } from 'date-fns';
import { fetchPopularPosts } from '@/community/api/community';

function DailyPanel({ date, onClose }) {
  const navigate = useNavigate();

  // 날짜 상태
  const [targetDate, setTargetDate] = useState(null);
  const dateStr = useMemo(
    () => (targetDate ? format(targetDate, 'yyyy-MM-dd') : ''),
    [targetDate]
  );

  // 아이템 개수(객체 형태로 단순화)
  const [items, setItems] = useState({ key: 0, shield: 0, eraser: 0 });

  // 출석일
  const [attendedDates, setAttendedDates] = useState([]);

  // 열쇠로 언락한 날짜(문자열 yyyy-MM-dd)
  const [keyUnlockedDates, setKeyUnlockedDates] = useState([]);

  // 인기글
  const [popularPosts, setPopularPosts] = useState([]);
  const [popularError, setPopularError] = useState(null);

  // 질문 상태 (store)
  const { fetchTodayQuestion } = useTodayQuestionStore();
  const question = useDailyQuestionStore((s) => s.question);
  const error = useDailyQuestionStore((s) => s.error);
  const isDailyLoading = useDailyQuestionStore((s) => s.isLoading);
  const fetchQuestionByDate = useDailyQuestionStore(
    (s) => s.fetchQuestionByDate
  );

  // 최초: 내 아이템 개수
  useEffect(() => {
    (async () => {
      try {
        const res = await getMyItems();
        const map = Object.fromEntries(
          res.map((i) => [i.type.toLowerCase(), i.quantity])
        );
        setItems({
          key: map.key || 0,
          shield: map.shield || 0,
          eraser: map.eraser || 0,
        });
      } catch (err) {
        console.error('아이템 개수 조회 실패:', err);
      }
    })();
  }, []);

  // 부모에서 받은 주간 데이터로 targetDate 세팅
  useEffect(() => {
    if (date?.day && date?.weekDates) {
      const selected = date.weekDates.find((d) => d.day === date.day);
      if (selected)
        setTargetDate(
          new Date(selected.year, selected.month - 1, selected.day)
        );
    }
  }, [date]);

  // targetDate가 바뀔 때 한 번에 패치(출석/인기글/질문)
  useEffect(() => {
    if (!targetDate) return;

    const run = async () => {
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1;

      try {
        // 출석일
        const answered = await getMonthlyAnswerStatus(year, month);
        const days = answered
          .map((d) => new Date(d).getDate())
          .filter((n) => !isNaN(n));
        setAttendedDates(days);
      } catch (e) {
        console.error('출석 정보 불러오기 실패:', e);
        setAttendedDates([]);
      }

      try {
        // 인기글
        const res = await fetchPopularPosts(format(targetDate, 'yyyy-MM-dd'));
        setPopularPosts(res.data?.posts || []);
        setPopularError(null);
      } catch (e) {
        const message =
          e.response?.data?.message || '인기 게시글을 불러오지 못했습니다.';
        setPopularError(message);
        setPopularPosts([]);
      }

      // 질문 (두 소스 중 하나만 쓰고 싶으면 아래 둘 중 하나만 남기세요)
      fetchQuestionByDate(format(targetDate, 'yyyy-MM-dd'));
      fetchTodayQuestion(format(targetDate, 'yyyy-MM-dd'));
    };

    run();
  }, [targetDate, fetchQuestionByDate, fetchTodayQuestion]);

  const handleUseItem = (type, extra = {}) => {
    setItems((prev) => ({
      ...prev,
      [type]: Math.max(0, (prev[type] || 0) - 1),
    }));

    if (type === 'key' && extra.isKeyUnlocked && extra.date) {
      const k = format(extra.date, 'yyyy-MM-dd');
      setKeyUnlockedDates((prev) => (prev.includes(k) ? prev : [...prev, k]));
    }

    if (type === 'shield' && extra.isCookie && extra.date) {
      const dayNum = extra.date.getDate();
      setAttendedDates((prev) =>
        prev.includes(dayNum) ? prev : [...prev, dayNum]
      );
    }
  };

  const handleQuestionClick = () => {
    navigate('/home/detail', { state: { date: targetDate } });
  };

  return (
    <>
      <Dim onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <WeeklyRow>
            {date?.weekDates?.map(({ day, month, year }) => {
              const today = new Date();
              const d = new Date(year, month - 1, day);
              const isToday = d.toDateString() === today.toDateString();
              const isFuture = d > today;
              const isPast = !isFuture && !isToday;

              const isCookie =
                (isPast || isToday) && attendedDates.includes(day);
              const isMissed = isPast && !attendedDates.includes(day);

              return (
                <DayCell
                  key={`${year}-${month}-${day}`}
                  onClick={() => !isFuture && setTargetDate(d)}
                >
                  {isCookie ? (
                    <CookieIcon src={cookieImg} alt='cookie' />
                  ) : (
                    <DateBox $isToday={isToday}>
                      <DateText
                        $color={
                          isToday ? 'white' : isMissed ? 'error' : 'primary'
                        }
                      >
                        {day}
                      </DateText>
                    </DateBox>
                  )}
                </DayCell>
              );
            })}
          </WeeklyRow>

          <ItemButtons
            items={items}
            onUse={handleUseItem}
            attendedDates={attendedDates}
            targetDate={targetDate}
            setAttendedDates={setAttendedDates}
          />

          <QnAWrapper>
            <QuestionCard onClick={handleQuestionClick}>
              <Header>
                <Label>질문</Label>
                <CardDateText>
                  {targetDate ? dateStr.replaceAll('-', '.') : ''}
                </CardDateText>
              </Header>
              <QuestionText>
                {error
                  ? error
                  : isDailyLoading
                  ? '질문을 불러오는 중입니다...'
                  : question || '질문이 없습니다.'}
              </QuestionText>
              <Bottom>
                <BottomItem>
                  <BottomImg src={likeImg} alt='like' /> 공감
                </BottomItem>
                <BottomItem>
                  <BottomImg src={commentImg} alt='comment' /> 댓글
                </BottomItem>
              </Bottom>
            </QuestionCard>

            <BestAnswerText>최고 인기 답변</BestAnswerText>
            <AnswerList>
              {popularError ? (
                <EmptyMessage>{popularError}</EmptyMessage>
              ) : popularPosts.length === 0 ? (
                <EmptyMessage>인기 게시글이 없습니다.</EmptyMessage>
              ) : (
                popularPosts
                  .slice(0, 3)
                  .map((post, idx) => (
                    <AnswerCard
                      key={post.id}
                      postId={post.id}
                      rank={idx + 1}
                      title={post.title}
                      subtitle={post.content}
                      userId={`@${post.username}`}
                      bookmarkCount={post.bookmarkCount}
                      likeCount={post.likeCount}
                      commentCount={post.commentCount}
                    />
                  ))
              )}
            </AnswerList>
          </QnAWrapper>
        </ModalContainer>
      </Dim>
    </>
  );
}

export default DailyPanel;

const slideUp = keyframes`
  from { bottom: -100%; }
  to   { bottom: 0; }
`;

const Dim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 99;
`;

const ModalContainer = styled.div`
  position: relative;
  top: 145px;
  width: 100%;
  height: 655px;
  background-color: ${({ theme }) => theme.colors.ivory3};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0px -4px 10px 0px rgba(116, 81, 45, 0.25);
  animation: ${slideUp} 0.3s ease-out;
  padding: 23px 20px 28px 20px;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const WeeklyRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  height: 39px;
`;

const QnAWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 14px 16px 2px 16px;
  border: 1px solid black;
  margin-bottom: 6px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  ${({ theme }) => theme.fonts.b16M};
  color: ${({ theme }) => theme.colors.black};
`;

const CardDateText = styled.span`
  ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.green};
`;

const QuestionText = styled.div`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.black};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: end;
  ${({ theme }) => theme.fonts.ns14M};
  color: ${({ theme }) => theme.colors.green};
`;

const BottomItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.green};
  padding: 10px 6px 14px 6px;
`;

const BottomImg = styled.img`
  width: 14px;
  height: 14px;
`;

const BestAnswerText = styled.span`
  ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.primary};
  padding: 8px;
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.fonts.b16L};
  padding: 20px 0;
`;
