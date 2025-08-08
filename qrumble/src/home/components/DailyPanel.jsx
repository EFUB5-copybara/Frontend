import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  DayCell,
  DateBox,
  DateText,
  CookieIcon,
} from './styles/CalendarStyles';
import cookieImg from '../assets/svgs/cookie.svg';
import keyImg from '../assets/svgs/key.svg';
import shieldImg from '../assets/svgs/shield.svg';
import eraserImg from '../assets/svgs/eraser.svg';
import likeImg from '../assets/svgs/like.svg';
import commentImg from '../assets/svgs/question-comments.svg';
import ItemButtons from './ItemButtons';
import AnswerCard from './AnswerCard';
import { getItemCounts } from '../api/homepage';
import { useNavigate } from 'react-router-dom';
import useTodayQuestionStore from '../stores/useTodayQuestionStore'; // 추가
import useDailyQuestionStore from '../stores/useDailyQuestionStore';
import { getMonthlyAnswerStatus } from '../api/homepage';
import { format } from 'date-fns';
import { fetchPopularPosts, fetchPostDetail } from '@/community/api/community';

function DailyPanel({ date, onClose }) {
  const [targetDate, setTargetDate] = useState(null);
  const [items, setItems] = useState([]);
  const [attendedDates, setAttendedDates] = useState([]);

  const {
    todayQuestion,
    todayQuestionDate,
    todayQuestionError,
    fetchTodayQuestion,
    isLoading,
  } = useTodayQuestionStore();

  const question = useDailyQuestionStore((state) => state.question);
  const error = useDailyQuestionStore((state) => state.error);
  const isDailyLoading = useDailyQuestionStore((state) => state.isLoading);
  const fetchQuestionByDate = useDailyQuestionStore(
    (state) => state.fetchQuestionByDate
  );

  useEffect(() => {
    if (!targetDate) return;
    const dateStr = format(targetDate, 'yyyy-MM-dd');
    fetchQuestionByDate(dateStr);
  }, [targetDate]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getMyItems();

        // type 기준으로 개수 매핑
        const itemMap = Object.fromEntries(
          res.map((item) => [item.type.toLowerCase(), item.quantity])
        );

        setItems([
          { name: 'key', img: keyImg, count: itemMap.key || 0 },
          { name: 'shield', img: shieldImg, count: itemMap.shield || 0 },
          { name: 'eraser', img: eraserImg, count: itemMap.eraser || 0 },
        ]);
      } catch (err) {
        console.error('아이템 개수 조회 실패:', err);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (date?.day && date?.weekDates) {
      const selected = date.weekDates.find((d) => d.day === date.day);
      if (selected) {
        setTargetDate(
          new Date(selected.year, selected.month - 1, selected.day)
        );
      }
    }
  }, [date]);

  useEffect(() => {
    const fetchAttendedDates = async () => {
      if (!targetDate) return;

      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1;

      try {
        const answered = await getMonthlyAnswerStatus(year, month); // ["2025-08-01", ...]
        const days = answered
          .map((d) => new Date(d).getDate())
          .filter((n) => !isNaN(n)); // 숫자 날짜만 추출

        setAttendedDates(days);
      } catch (err) {
        console.error('출석 정보 불러오기 실패:', err);
        setAttendedDates([]);
      }
    };

    fetchAttendedDates();
  }, [targetDate]);

  useEffect(() => {
    if (!targetDate) return;
    const dateStr = format(targetDate, 'yyyy-MM-dd');
    fetchTodayQuestion(dateStr);
  }, [targetDate]);

  const handleUseItem = (type) => {
    setItems((prev) =>
      prev.map((i) => (i.name === type ? { ...i, count: i.count - 1 } : i))
    );
  };

  const navigate = useNavigate();

  const handleQuestionClick = () => {
    navigate('/home/detail', { state: { date: targetDate } });
  };

  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      if (!targetDate) return;
      const dateStr = format(targetDate, 'yyyy-MM-dd');

      try {
        const res = await fetchPopularPosts(dateStr); // API 호출
        setPopularPosts(res.posts); // posts 배열 저장
      } catch (err) {
        console.error('인기 게시글 조회 실패:', err);
        setPopularPosts([]);
      }
    };

    fetchPopular();
  }, [targetDate]);

  return (
    <>
      <Dim onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <WeeklyRow>
            {date?.weekDates?.map(({ day, month, year }) => {
              const today = new Date();

              const isToday =
                new Date(year, month - 1, day).toDateString() ===
                today.toDateString();

              const isFuture = new Date(year, month - 1, day) > today;
              const isPast = !isFuture && !isToday;

              const isCookie =
                (isPast || isToday) && attendedDates.includes(day);
              const isMissed = isPast && !attendedDates.includes(day);

              return (
                <DayCell
                  key={`${year}-${month}-${day}`}
                  onClick={() => setTargetDate(new Date(year, month - 1, day))}
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
            items={Object.fromEntries(
              items.map(({ name, count }) => [name, count])
            )}
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
                  {targetDate ? format(targetDate, 'yyyy.MM.dd') : ''}
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
                  <BottomImg src={commentImg} alt='comment' />
                  댓글
                </BottomItem>
              </Bottom>
            </QuestionCard>

            <BestAnswerText>최고 인기 답변</BestAnswerText>
            <AnswerList>
              {!attendedDates.includes(targetDate?.getDate()) ? (
                <EmptyMessage>
                  답변을 하지 않은 날은 다른 유저의 답변을 확인할 수 없습니다.
                </EmptyMessage>
              ) : !Array.isArray(popularPosts) || popularPosts.length === 0 ? (
                <EmptyMessage>인기 게시글이 없습니다.</EmptyMessage>
              ) : (
                popularPosts
                  .slice(0, 3)
                  .map((post, idx) => (
                    <AnswerCard
                      key={post.id}
                      rank={idx + 1}
                      title={post.username}
                      subtitle={post.content}
                      userId={`@${post.username}`}
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
  from {
    bottom: -100%;
  }
  to {
    bottom: 0;
  }
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.fonts.b16L};
  padding: 20px 0;
`;
