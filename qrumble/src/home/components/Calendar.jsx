import React from "react";
import styled from "styled-components";
import cookieImg from "../../assets/image/cookie.png";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ year, month }) {
  const today = new Date(2025, 2, 11); // 테스트용 오늘 (2025.03.09)
  const currentFirstDate = new Date(year, month - 1, 1);
  const currentLastDate = new Date(year, month, 0).getDate();
  const firstDay = currentFirstDate.getDay();

  const totalCellsNeeded = firstDay + currentLastDate;
  const displayCells = totalCellsNeeded <= 35 ? 35 : 42;
  const nextMonthPreviewCount = displayCells - totalCellsNeeded;

  const days = [];

  // 현재 월 날짜들
  for (let i = 1; i <= currentLastDate; i++) {
    days.push({
      date: i,
      type: "current",
    });
  }

  // 다음 달 날짜들
  for (let i = 1; i <= nextMonthPreviewCount; i++) {
    days.push({
      date: i,
      type: "next",
    });
  }

  const attendedDates = [4, 5, 6, 7, 8];

  return (
    <Wrapper>
      <WeekRow>
        {WEEK_DAYS.map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekRow>
      <DaysGrid>
        {Array(firstDay)
          .fill(null)
          .map((_, idx) => (
            <DayCell key={`empty-${idx}`} />
          ))}
        {days.map((item, idx) => {
          const isToday =
            item.type === "current" &&
            today.getFullYear() === year &&
            today.getMonth() === month - 1 &&
            today.getDate() === item.date;

          const isPast =
            item.type === "current" &&
            new Date(year, month - 1, item.date) < today;

          const isCookie =
            item.type === "current" &&
            attendedDates.includes(item.date) &&
            isPast;

          const isMissed =
            item.type === "current" &&
            isPast &&
            !attendedDates.includes(item.date);

          return (
            <DayCell key={`day-${idx}`}>
              {item.type === "next" ? (
                <DateText $color="brown3">{item.date}</DateText>
              ) : isCookie ? (
                <CookieIcon src={cookieImg} alt="cookie" />
              ) : (
                <DateBox $isToday={isToday}>
                  <DateText
                    $color={isToday ? "white" : isMissed ? "error" : "primary"}
                  >
                    {item.date}
                  </DateText>
                </DateBox>
              )}
            </DayCell>
          );
        })}
      </DaysGrid>
    </Wrapper>
  );
}

export default Calendar;

const Wrapper = styled.div`
  width: 100%;
`;

const WeekRow = styled.div`
  font-family: ${({ theme }) => theme.typography.nunitoSubtitle14SB};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 20px;
`;

const WeekDay = styled.div`
  ${({ theme }) => theme.typography.nunitoSubtitle14S};
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayCell = styled.div`
  width: 39px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateBox = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $isToday, theme }) =>
    $isToday &&
    `
    background-color: ${theme.colors.primary};
  `}
`;

const DateText = styled.div`
  ${({ theme }) => theme.typography.nunitoSubtitle14SB};
  color: ${({ $color, theme }) => theme.colors[$color || "primary"]};
`;

const CookieIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
