import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MissionBar from "../components/MissionBar";
import MonthSelector from "../components/MonthSelector";
import Calendar from "../components/Calendar";
import DailyQuestion from "../components/DailyQuestion";
import Cookiejar from "../components/Cookiejar";
import MonthPickerModal from "../components/MonthPickerModal";
import QuestionList from "../components/QuestionList";
import DailyPanel from "../components/DailyPanel";

function HomePage() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(3);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [monthlyCookieJarLevel, setMonthlyCookieJarLevel] = useState(0);
  const [isDailyPanelOpen, setIsDailyPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  const handleMonthSelect = (newYear, newMonth) => {
    setYear(newYear);
    setMonth(newMonth);
    setIsMonthSelectorOpen(false);
  };

  const handleCalendarClick = () => {
    const today = new Date();
    const center = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const weekDates = [];
    for (let i = -3; i <= 3; i++) {
      const temp = new Date(center);
      temp.setDate(center.getDate() + i);
      weekDates.push({
        year: temp.getFullYear(),
        month: temp.getMonth() + 1,
        day: temp.getDate(),
      });
    }

    setSelectedDate({
      year: center.getFullYear(),
      month: center.getMonth() + 1,
      day: center.getDate(),
      weekDates,
    });

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
            onSelect={handleMonthSelect}
            onClose={() => setIsMonthSelectorOpen(false)}
          />
        )}
      </SelectorWrapper>

      <SwipeArea>
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
              setSelectedDate({ day, weekDates });
              setIsDailyPanelOpen(true);
            }}
            setMonthlyCookieJarLevel={setMonthlyCookieJarLevel}
          />
          <DailyQuestion onClick={() => navigate("/home/write")} />
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
    </Container>
  );
}

export default HomePage;

// --- Styled Components ---
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 50px 19px 0 19px;
  background-color: ${({ theme }) => theme.colors.ivory3};
  gap: 14px;
`;

const SelectorWrapper = styled.div`
  position: relative;
`;

const SwipeArea = styled.div`
  overflow: hidden;
`;

const ContentArea = styled.div`
  max-height: ${({ $collapsed }) => ($collapsed ? "0px" : "1000px")};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const QuestionArea = styled.div`
  max-height: ${({ $collapsed }) => ($collapsed ? "1000px" : "0px")};
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
