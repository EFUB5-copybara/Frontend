import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MissionBar from '../components/MissionBar';
import MonthSelector from '../components/MonthSelector';
import Calendar from '../components/Calendar';
import DailyQuestion from '../components/DailyQuestion';
import Cookiejar from '../components/Cookiejar';
import MonthPickerModal from '../components/MonthPickerModal';
import QuestionList from '../components/QuestionList';
import DailyPanel from '../components/DailyPanel';
import WriteFixButton from '../components/WriteFixButton';
import { getDailyQuestion } from '../api/homepage';
import useTodayQuestionStore from '../stores/useTodayQuestionStore';

function HomePage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [monthlyCookieJarLevel, setMonthlyCookieJarLevel] = useState(0);
  const [isDailyPanelOpen, setIsDailyPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  const [startY, setStartY] = useState(null);
  const [startX, setStartX] = useState(null);

  const handleTouchStart = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches ? e.changedTouches[0] : e;
    const endY = touch.clientY;
    const endX = touch.clientX;

    // 상하 스와이프 처리
    if (startY !== null) {
      const diffY = endY - startY;
      if (diffY > 50) setCollapsed(true);
      else if (diffY < -50) setCollapsed(false);
      setStartY(null);
    }

    // 좌우 스와이프 처리
    if (startX !== null) {
      const diffX = endX - startX;
      if (diffX > 50) animateMonthChange('prev');
      else if (diffX < -50) animateMonthChange('next');
      setStartX(null);
    }
  };

  const moveToNextMonth = () => {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    setMonth(nextMonth);
    setYear(nextYear);
  };

  const moveToPreviousMonth = () => {
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    setMonth(prevMonth);
    setYear(prevYear);
  };

  const handleWheel = (e) => {
    if (!collapsed && e.deltaY > 50) {
      setCollapsed(true);
    } else if (collapsed && e.deltaY < -50) {
      setCollapsed(false);
    }
  };

  const handleMonthSelect = (newYear, newMonth, newDate) => {
    setYear(newYear);
    setMonth(newMonth);

    const weekDates = getWeekDatesCenteredOnToday(
      newYear,
      newMonth - 1,
      newDate
    );

    setSelectedDate({
      day: newDate,
      month: newMonth,
      year: newYear,
      weekDates,
    });

    setIsMonthSelectorOpen(false);
    setIsDailyPanelOpen(true);
  };

  const { todayQuestion, todayQuestionError, fetchTodayQuestion } =
    useTodayQuestionStore();

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    fetchTodayQuestion(formattedDate);
  }, []);

  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState('next');

  const animateMonthChange = (dir) => {
    setDirection(dir);
    setIsSliding(true);

    setTimeout(() => {
      if (dir === 'next') moveToNextMonth();
      else moveToPreviousMonth();
      setIsSliding(false);
    }, 70);
  };

  return (
    <Container>
      <MissionBar />

      <SelectorWrapper>
        <MonthSelector
          year={year}
          month={month}
          onClick={() => setIsMonthSelectorOpen(true)}
        />
        {isMonthSelectorOpen && (
          <MonthPickerModal
            selectedYear={year}
            selectedMonth={month}
            selectedDate={0} // 기본 초기 날짜로 전달
            onSelect={handleMonthSelect}
            onClose={() => setIsMonthSelectorOpen(false)}
          />
        )}
      </SelectorWrapper>

      <SwipeArea
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onWheel={handleWheel}
      >
        <ContentArea $collapsed={collapsed}>
          <CalendarSlider $direction={direction} $animating={isSliding}>
            <Calendar
              year={year}
              month={month}
              onSelectDate={({ day }) => {
                const weekDates = getWeekDatesCenteredOnToday(
                  year,
                  month - 1,
                  day
                );
                setSelectedDate({
                  day,
                  month,
                  year,
                  weekDates,
                });
                setIsDailyPanelOpen(true);
              }}
              setMonthlyCookieJarLevel={setMonthlyCookieJarLevel}
            />
          </CalendarSlider>
          <DailyQuestion
            status={
              todayQuestionError
                ? 'error'
                : !todayQuestion
                ? 'loading'
                : 'success'
            }
            question={todayQuestion}
            onClick={() => navigate('/home/write')}
          />
          <Cookiejar level={monthlyCookieJarLevel} />
        </ContentArea>

        <QuestionArea $collapsed={collapsed}>
          <QuestionList />
        </QuestionArea>
      </SwipeArea>

      {isDailyPanelOpen && selectedDate && (
        <DailyPanel
          date={selectedDate}
          onClose={() => setIsDailyPanelOpen(false)}
        />
      )}
      <WriteFixButton />
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 30px 20px 65px 20px;
  height: 800px;
  background-color: ${({ theme }) => theme.colors.ivory3};
`;

const SelectorWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SwipeArea = styled.div`
  overflow: hidden;
`;

const ContentArea = styled.div`
  max-height: ${({ $collapsed }) => ($collapsed ? '0px' : '1000px')};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const QuestionArea = styled.div`
  max-height: ${({ $collapsed }) => ($collapsed ? '1000px' : '0px')};
  opacity: ${({ $collapsed }) => ($collapsed ? 1 : 0)};
  transition: all 0.4s ease;
  overflow: hidden;
`;

function getWeekDatesCenteredOnToday(year, month, selectedDay) {
  const center = new Date(year, month, selectedDay);

  const weekDates = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date(center);
    d.setDate(center.getDate() + i);
    weekDates.push({
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    });
  }

  return weekDates;
}

const CalendarSlider = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;

  & > div {
    width: 100%;
    flex-shrink: 0;
    transform: ${({ $direction, $animating }) =>
      $animating
        ? $direction === 'next'
          ? 'translateX(100%)'
          : 'translateX(-100%)'
        : 'translateX(0)'};
    transition: transform 0.3s ease;
  }
`;
