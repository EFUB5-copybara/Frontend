import React, { useState } from 'react';
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

function HomePage() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(3);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [monthlyCookieJarLevel, setMonthlyCookieJarLevel] = useState(0);
  const [isDailyPanelOpen, setIsDailyPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  const [startY, setStartY] = useState(null);

  const handleStart = (e) => {
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    setStartY(y);
  };

  const handleEnd = (e) => {
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    if (startY !== null) {
      const diffY = endY - startY;

      if (diffY > 50) {
        setCollapsed(true);
      } else if (diffY < -50) {
        setCollapsed(false);
      }
      setStartY(null);
    }
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
            selectedDate={1} // 기본 초기 날짜로 전달
            onSelect={handleMonthSelect}
            onClose={() => setIsMonthSelectorOpen(false)}
          />
        )}
      </SelectorWrapper>

      <SwipeArea
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onWheel={handleWheel}>
        <ContentArea $collapsed={collapsed}>
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
          <DailyQuestion onClick={() => navigate('/home/write')} />
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
  padding: 30px 20px 65px 20px;
  /* padding: 50px 19px 0 18px; */
  height: 800px;
  background-color: ${({ theme }) => theme.colors.ivory3};
  gap: 14px;
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
