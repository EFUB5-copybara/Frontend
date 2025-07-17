import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MissionBar from "../components/MissionBar";
import MonthSelector from "../components/MonthSelector";
import Calendar from "../components/Calendar";
import DailyQuestion from "../components/DailyQuestion";
import Cookiejar from "../components/Cookiejar";
import MonthPickerModal from "../components/MonthPickerModal";
import QuestionList from "../components/QuestionList";

function HomePage() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(3);
  const [date, setDate] = useState(11);

  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleSelect = (newYear, newMonth, newDate) => {
    setYear(newYear);
    setMonth(newMonth);
    setDate(newDate);
    setIsMonthSelectorOpen(false);
  };

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

  const [monthlyCookieJarLevel, setMonthlyCookieJarLevel] = useState(0);

  return (
    <Container>
      <MissionBar />
      <SelectorWrapper>
        <MonthSelector
          year={year}
          month={month}
          date={date}
          onClick={() => setIsMonthSelectorOpen(true)}
        />
        {isMonthSelectorOpen && (
          <MonthPickerModal
            selectedYear={year}
            selectedMonth={month}
            selectedDate={date}
            onSelect={handleSelect}
            onClose={() => setIsMonthSelectorOpen(false)}
          />
        )}
      </SelectorWrapper>

      <SwipeArea
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onWheel={handleWheel}
      >
        <ContentArea $collapsed={collapsed}>
          <Calendar
            year={year}
            month={month}
            setMonthlyCookieJarLevel={setMonthlyCookieJarLevel}
          />
          <DailyQuestion onClick={() => navigate("/home/write")} />
          <Cookiejar level={monthlyCookieJarLevel} />
        </ContentArea>

        <QuestionArea $collapsed={collapsed}>
          <QuestionList />
        </QuestionArea>
      </SwipeArea>
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
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
