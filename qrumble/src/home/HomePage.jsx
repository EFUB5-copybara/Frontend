import React, { useState } from "react";
import styled from "styled-components";
import MissionBar from "./components/MissionBar";
import MonthSelector from "./components/MonthSelector";
import Calendar from "./components/Calendar";
import DailyQuestion from "./components/DailyQuestion";
import Cookiejar from "./components/Cookiejar";

function HomePage() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(3);

  const handleMonthClick = () => {
    // 추후 Month Picker 모달 열기용
    console.log("월 선택 모달 열기");
  };

  return (
    <Container>
      <MissionBar />
      <CalendarContainer>
        <MonthSelector year={year} month={month} onClick={handleMonthClick} />
        <Calendar year={year} month={month} />
      </CalendarContainer>
      <DailyQuestion onClick={() => console.log("답변 페이지로 이동")} />
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
  gap: 0;
  min-height: 322px;
`;
