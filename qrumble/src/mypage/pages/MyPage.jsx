import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import alarmonImg from "../assets/alramon.svg";
import alarmoffImg from "../assets/alramoff.svg";
import bookmarkImg from "../assets/bookmark.svg";
import myrecordImg from "../assets/myrecord.svg";

function MyPage() {
  const [selected, setSelected] = useState("info");
  const [alarmOn, setAlarmOn] = useState(false);

  return (
    <>
      <TitleText>마이 페이지</TitleText>
      <Container>
        <UserInfoButton>
          <Profile />
          <UserInfoWrapper>
            <UserName>사용자 이름</UserName>
            <UserMail>user@email.com</UserMail>
          </UserInfoWrapper>
        </UserInfoButton>
        <InfoThemeWrapper>
          <MyInfoButton
            selected={selected === "info"}
            onClick={() => setSelected("info")}
          >
            내 정보
          </MyInfoButton>
          <ThemeButton
            selected={selected === "theme"}
            onClick={() => setSelected("theme")}
          >
            테마
          </ThemeButton>
        </InfoThemeWrapper>
        <InfoBox>
          <MyRecordButton>
            <ButtonImg src={myrecordImg} alt="my record" />내 기록
          </MyRecordButton>
          <BookMarkButton>
            <ButtonImg src={bookmarkImg} alt="bookmark" />
            북마크
          </BookMarkButton>
          <AlramButton onClick={() => setAlarmOn(!alarmOn)}>
            <ButtonImg
              src={alarmOn ? alarmonImg : alarmoffImg}
              alt="alarm toggle"
            />
            {alarmOn ? "알림 끄기" : "알림 켜기"}
          </AlramButton>
          <NumberOfInfo>
            <Count>24</Count>
            좋아요
          </NumberOfInfo>
          <NumberOfInfo>
            <Count>16</Count>
            댓글 수
          </NumberOfInfo>
          <NumberOfInfo>
            <Count>32</Count>
            작성한 일기
          </NumberOfInfo>
        </InfoBox>
      </Container>
    </>
  );
}

export default MyPage;

const TitleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 59px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.t20SB};
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  gap: 12px;
`;

const UserInfoButton = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  justify-content: space-between;
  padding: 11px 19px;
  width: 100%;
  height: 80px;
`;

const Profile = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.brown2};
  background-color: ${({ theme }) => theme.colors.brown3};
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 48px;
  align-items: flex-end;
`;

const UserName = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.b18M};
  margin: 0px;
`;

const UserMail = styled.p`
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.c14L};
  margin: 0px;
`;

const InfoThemeWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MyInfoButton = styled.button`
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  padding: 8px;
  height: 42px;
  width: 155px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.brown1 : theme.colors.white};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.brown1};
  font-family: ${({ theme }) => theme.fonts.b16B};
`;

const ThemeButton = styled(MyInfoButton)``;

const InfoBox = styled.div`
  width: 100%;
  height: 201px;
  padding: 25px 42px 24px 42px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  background-color: ${({ theme }) => theme.colors.white};
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 47px;
  justify-content: space-around;
  place-items: center;
`;

const MyRecordButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c12M};
  padding: 0px;
  width: 47px;
`;

const BookMarkButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c12M};
  padding: 0px;
  width: 47px;
`;

const AlramButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c12M};
  padding: 0px;
  width: 47px;
`;

const ButtonImg = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 100px;
`;

const NumberOfInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c12M};
  padding: 0px;
  white-space: nowrap;
  width: 47px;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 47px;
  height: 47px;
  border-radius: 100px;
  padding: 10px 5px 9px 6px;
  background-color: ${({ theme }) => theme.colors.ivory1};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.t20SB};
`;
