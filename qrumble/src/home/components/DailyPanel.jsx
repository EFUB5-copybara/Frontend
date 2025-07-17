import React from "react";
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

function DailyPanel({ date, onClose }) {
  const attendedDates = [4, 5, 6, 7, 8];

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
                <DayCell key={`${year}-${month}-${day}`}>
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

          <ItemWrapper>
            {[keyImg, shieldImg, eraserImg].map((img, index) => (
              <ItemButton key={index}>
                <ItemImg src={img} alt="item" />
                10개
              </ItemButton>
            ))}
          </ItemWrapper>

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
                <AnswerCard key={rank}>
                  <Rank>{rank}</Rank>
                  <AnswerContent>
                    <AnswerTitle>
                      name <span>about a diary in english...</span>
                    </AnswerTitle>
                    <AnswerMeta>
                      <AnswerId>
                        <AnswerIdImg src={userImg} alt="user" /> 아이디
                      </AnswerId>
                      <AnswerBottomWrapper>
                        {[brownlikeImg, browncommentImg, brownbookmarkImg].map(
                          (img, idx) => (
                            <AnswerBottomItem key={idx}>
                              <AnswerBottomImg src={img} alt="icon" />
                            </AnswerBottomItem>
                          )
                        )}
                      </AnswerBottomWrapper>
                    </AnswerMeta>
                  </AnswerContent>
                </AnswerCard>
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
  position: absolute;
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

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  gap: 8px;
`;

const ItemButton = styled.button`
  width: 101px;
  border-radius: 100px;
  padding: 6px 18px 6px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green};
`;

const ItemImg = styled.img`
  width: 24px;
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

const AnswerCard = styled.div`
  display: flex;
  padding: 0 10px 0 20px;
  height: 104px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Rank = styled.div`
  font-family: ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.primary};
`;

const AnswerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AnswerTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 261px;
  height: 52px;
  font-family: ${({ theme }) => theme.fonts.b16B};
  background-color: ${({ theme }) => theme.colors.ivory2};
  color: ${({ theme }) => theme.colors.primary};
  padding: 3px 9px 9px 8px;
  margin-top: 10px;
  span {
    font-family: ${({ theme }) => theme.fonts.c12L};
  }
`;

const AnswerMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.primary};
  height: 42px;
`;

const AnswerId = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 17px;
`;

const AnswerIdImg = styled.img`
  width: 17px;
  height: 17px;
  border-radius: 50%;
`;

const AnswerBottomWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AnswerBottomItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.brown1};
  padding: 14px 6px 14px 6px;
`;

const AnswerBottomImg = styled.img`
  width: 14px;
  height: 14px;
`;
