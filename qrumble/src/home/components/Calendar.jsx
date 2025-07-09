import React from "react";
import styled from "styled-components";
import cookieImg from "../../assets/image/cookie.png";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ year, month }) {
  const today = new Date();
  const currentDate = new Date(year, month - 1);

  const firstDay = new Date(year, month - 1, 1).getDay(); // 시작 요일
  const lastDate = new Date(year, month, 0).getDate(); // 마지막 날짜

  const days = [];

  // 빈 칸 채우기
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // 날짜 채우기
  for (let i = 1; i <= lastDate; i++) {
    days.push(i);
  }

  return (
    <Wrapper>
      <WeekRow>
        {WEEK_DAYS.map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekRow>
      <DaysGrid>
        {days.map((date, idx) => {
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month - 1 &&
            today.getDate() === date;

          const isCookieDate = [3, 4, 5, 6, 7, 9].includes(date); // 출석 날짜 예시

          return (
            <DayCell key={idx}>
              {date && (
                <>
                  {isCookieDate ? (
                    <CookieIcon src={cookieImg} alt="cookie" />
                  ) : (
                    <DateBox $isToday={isToday}>
                      <DateText $isSunday={idx % 7 === 0}>{date}</DateText>
                    </DateBox>
                  )}
                </>
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
  padding-top: 8px;
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
`;

const WeekDay = styled.div`
  ${({ theme }) => theme.typography.nunitoSubtitle14S};
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 10px;
`;

const DayCell = styled.div`
  width: 39px;
  height: 39px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
    color: white;
  `}
`;

const DateText = styled.div`
  ${({ theme }) => theme.typography.nunitoSubtitle14SB};
`;

const CookieIcon = styled.img`
  width: 39px;
  height: 39px;
  object-fit: cover;
`;
