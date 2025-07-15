import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MissionBar from "../components/MissionBar";
import MonthSelector from "../components/MonthSelector";
import Calendar from "../components/Calendar";
import DailyQuestion from "../components/DailyQuestion";
import Cookiejar from "../components/Cookiejar";
import MonthPickerModal from "../components/MonthPickerModal";

function HomePage() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(3);
  const [date, setDate] = useState(11);

  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);

  const handleSelect = (newYear, newMonth, newDate) => {
    setYear(newYear);
    setMonth(newMonth);
    setDate(newDate);
    setIsMonthSelectorOpen(false);
  };

  const navigate = useNavigate();

  return (
    <Container>
      <MissionBar />
      <CalendarContainer>
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
        <Calendar year={year} month={month} />
      </CalendarContainer>
      <DailyQuestion onClick={() => navigate("/home/write")} />
      <Cookiejar />
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

const CalendarContainer = styled.div`
  position: relative;
  gap: 0;
  min-height: 322px;
`;

const SelectorWrapper = styled.div`
  position: relative;
`;
