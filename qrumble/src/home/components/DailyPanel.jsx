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
import { getDailyQuestion, getItemCounts } from '../api/homepage';
import { useNavigate } from 'react-router-dom';

function DailyPanel({ date, onClose }) {
  const attendedDates = [3, 4, 5, 6, 7, 8];

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getItemCounts();
        setItems([
          { name: 'key', img: keyImg, count: res.keyCount },
          { name: 'shield', img: shieldImg, count: res.shieldCount },
          { name: 'eraser', img: eraserImg, count: res.eraserCount },
        ]);
      } catch (err) {
        console.error('아이템 개수 조회 실패:', err);
      }
    };

    fetchItems();
  }, []);

  const [targetDate, setTargetDate] = useState(null);

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

  const handleUseItem = (type) => {
    setItems((prev) =>
      prev.map((i) => (i.name === type ? { ...i, count: i.count - 1 } : i))
    );
  };

  const [questionText, setQuestionText] = useState('');
  const [questionDate, setQuestionDate] = useState('');

  useEffect(() => {
    const getQuestion = async () => {
      if (!targetDate) return;

      const y = targetDate.getFullYear();
      const m = String(targetDate.getMonth() + 1).padStart(2, '0');
      const d = String(targetDate.getDate()).padStart(2, '0');
      const formattedDate = `${y}-${m}-${d}`;

      try {
        const res = await getDailyQuestion(formattedDate);
        setQuestionText(res.content);
        setQuestionDate(formattedDate);
      } catch (e) {
        setQuestionText('질문을 불러올 수 없습니다.');
        setQuestionDate(formattedDate);
      }
    };

    getQuestion();
  }, [targetDate]);

  const navigate = useNavigate();

  const handleQuestionClick = () => {
    navigate('/home/detail');
  };

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

              const isCookie = isPast && attendedDates.includes(day);
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
          />

          <QnAWrapper>
            <QuestionCard onClick={handleQuestionClick}>
              <Header>
                <Label>질문</Label>
                <CardDateText>{questionDate}</CardDateText>
              </Header>
              <QuestionText>{questionText}</QuestionText>
              <Bottom>
                <BottomItem>
                  <BottomImg src={likeImg} alt='like' /> 공감
                </BottomItem>
                <BottomItem>
                  <BottomImg src={commentImg} alt='comment' /> 101
                </BottomItem>
              </Bottom>
            </QuestionCard>

            <BestAnswerText>최고 인기 답변</BestAnswerText>
            <AnswerList>
              {[1, 2, 3].map((rank) => (
                <AnswerCard
                  key={rank}
                  rank={rank}
                  title='name'
                  subtitle='about a diary in english...'
                  userId='아이디'
                />
              ))}
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
