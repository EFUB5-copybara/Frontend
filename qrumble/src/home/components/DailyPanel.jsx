import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  DayCell,
  DateBox,
  DateText,
  CookieIcon,
} from "./styles/CalendarStyles";
import cookieImg from "../assets/svgs/cookie.svg";
import keyImg from "../assets/svgs/key.svg";
import shieldImg from "../assets/svgs/shield.svg";
import eraserImg from "../assets/svgs/eraser.svg";
import likeImg from "../assets/svgs/like.svg";
import commentImg from "../assets/svgs/question-comments.svg";
import userImg from "../assets/svgs/userimg.svg";
import brownlikeImg from "../assets/svgs/brownlike.svg";
import browncommentImg from "../assets/svgs/brownmessage.svg";
import brownbookmarkImg from "../assets/svgs/brownbookmark.svg";
import ItemButtons from "./ItemButtons";
import AlertModal from "./AlertModal";
import AnswerCard from "./AnswerCard";

function DailyPanel({ date, onClose }) {
  const attendedDates = [4, 5, 6, 7, 8];

  const [items, setItems] = useState([
    { name: "key", img: keyImg, count: 10 },
    { name: "shield", img: shieldImg, count: 10 },
    { name: "eraser", img: eraserImg, count: 10 },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: null });

  const [targetDate, setTargetDate] = useState(null);

  const handleUseItem = (type) => {
    const today = new Date(2025, 2, 11);

    const isAttended =
      targetDate &&
      attendedDates.some((d) => {
        const attended = new Date(2025, 2, d);
        return attended.toDateString() === targetDate.toDateString();
      });

    const canUseKey = targetDate && !isAttended;
    const canUseEraser = targetDate && isAttended;

    const canUseShield = (() => {
      const twoWeeksAgo = new Date(today);
      twoWeeksAgo.setDate(today.getDate() - 13);
      const missed = [];
      for (
        let d = new Date(twoWeeksAgo);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        const matched = attendedDates.some((attendedDay) => {
          const attended = new Date(2025, 2, attendedDay);
          return attended.toDateString() === d.toDateString();
        });
        if (!matched) missed.push(new Date(d));
      }
      return missed.length > 0;
    })();

    const itemMap = {
      key: canUseKey,
      eraser: canUseEraser,
      shield: canUseShield,
    };

    const item = items.find((i) => i.name === type);
    if (!item || item.count <= 0 || !itemMap[type]) {
      setAlert({ open: true, type: "unavailable" });
      return;
    }

    setSelectedItem(item);
    setAlert({ open: true, type: "confirm" });
  };

  const confirmUseItem = () => {
    setItems((prev) =>
      prev.map((i) =>
        i.name === selectedItem.name ? { ...i, count: i.count - 1 } : i
      )
    );
    setAlert({ open: false, type: null });
  };

  return (
    <>
      <Dim onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <WeeklyRow>
            {date?.weekDates?.map(({ day, month, year }) => {
              const today = new Date(2025, 2, 11); // 기준 오늘: 3월 11일

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
                    <CookieIcon src={cookieImg} alt="cookie" />
                  ) : (
                    <DateBox $isToday={isToday}>
                      <DateText
                        $color={
                          isToday ? "white" : isMissed ? "error" : "primary"
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

          {alert.open && alert.type === "confirm" && (
            <AlertModal
              isOpen={alert.open}
              onClose={() => setAlert({ open: false, type: null })}
              onConfirm={confirmUseItem}
            />
          )}

          {alert.open && alert.type === "unavailable" && (
            <AlertModal
              isOpen={alert.open}
              onClose={() => setAlert({ open: false, type: null })}
            />
          )}

          <QnAWrapper>
            <QuestionCard>
              <Header>
                <Label>질문</Label>
                <CardDateText>2025.04.02</CardDateText>
              </Header>
              <QuestionText>
                Euismod id sapien mi massa tortor fames.
              </QuestionText>
              <Bottom>
                <BottomItem>
                  <BottomImg src={likeImg} alt="like" /> 공감
                </BottomItem>
                <BottomItem>
                  <BottomImg src={commentImg} alt="comment" /> 101
                </BottomItem>
              </Bottom>
            </QuestionCard>

            <BestAnswerText>최고 인기 답변</BestAnswerText>
            <AnswerList>
              {[1, 2, 3].map((rank) => (
                <AnswerCard
                  key={rank}
                  rank={rank}
                  title="name"
                  subtitle="about a diary in english..."
                  userId="아이디"
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
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.b16M};
  color: ${({ theme }) => theme.colors.black};
`;

const CardDateText = styled.span`
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.green};
`;

const QuestionText = styled.div`
  font-family: ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.black};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: end;
  font-family: ${({ theme }) => theme.fonts.ns14M};
  color: ${({ theme }) => theme.colors.green};
`;

const BottomItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.green};
  padding: 10px 6px 14px 6px;
`;

const BottomImg = styled.img`
  width: 14px;
  height: 14px;
`;

const BestAnswerText = styled.span`
  font-family: ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.primary};
  padding: 8px;
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
