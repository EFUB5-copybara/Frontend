import React, { useState } from "react";
import styled from "styled-components";
import XImg from "../assets/svgs/X.svg";
import fireImg from "../assets/svgs/fire.svg";
import { useNavigate } from "react-router-dom";

function MissionPage() {
  const [activeTab, setActiveTab] = useState("daily");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const dailyMissions = [
    { label: "오늘의 답변 작성", point: "5P" },
    { label: "댓글 달기", point: "2P" },
    { label: "다른 사람 글에 좋아요 누르기", point: "2P" },
    { label: "포춘쿠키 열기", point: "10P" },
  ];

  const monthlyMissions = [
    { label: "답변을 20개 이상 받기", point: "20P" },
    { label: "댓글 10개 달기", point: "20P" },
    { label: "아이템 5개 이상 구매", point: "20P" },
  ];

  return (
    <Background>
      <Container>
        <XButton onClick={() => navigate("/home")}>
          <img src={XImg} alt="닫기" />
        </XButton>

        <ToggleWrapper>
          <ToggleSlider active={activeTab} />
          <ToggleButton
            isActive={activeTab === "daily"}
            onClick={() => handleTabChange("daily")}
          >
            일일 미션
          </ToggleButton>
          <ToggleButton
            isActive={activeTab === "monthly"}
            onClick={() => handleTabChange("monthly")}
          >
            월별 미션
          </ToggleButton>
        </ToggleWrapper>
        <ListWrapper>
          <AnimatedWrapper key={activeTab}>
            {activeTab === "daily" ? (
              <>
                <HighlightCard>
                  <IconRow>
                    <CheckIcon>출석체크</CheckIcon>
                    <FireWrapper>
                      <FireIcon src={fireImg} alt="연속 기록" />
                      <StreakText>7일</StreakText>
                    </FireWrapper>
                  </IconRow>
                  <PointText>
                    +1P <BonusText>+2P</BonusText>
                  </PointText>
                </HighlightCard>
                <MissionWrapper>
                  {dailyMissions.map((item, idx) => (
                    <MissionItem key={idx}>
                      {item.label}
                      <Point>{item.point}</Point>
                    </MissionItem>
                  ))}
                </MissionWrapper>
              </>
            ) : (
              <MissionWrapper>
                {monthlyMissions.map((item, idx) => (
                  <MissionItem key={idx}>
                    {item.label}
                    <Point red>{item.point}</Point>
                  </MissionItem>
                ))}
              </MissionWrapper>
            )}
          </AnimatedWrapper>
        </ListWrapper>
      </Container>
    </Background>
  );
}

export default MissionPage;

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.brown2};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 72px 20px 28px;
  width: 320px;
  height: 700px;
  border-radius: 20px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0;
`;

const XButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ToggleWrapper = styled.div`
  width: 208px;
  height: 46px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.brown3};
  display: flex;
  justify-content: space-between;
  padding: 4px;
  margin-top: 16px;
  position: relative;
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 4px;
  left: ${({ active }) => (active === "daily" ? "4px" : "104px")};
  width: 100px;
  height: 38px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: left 0.3s ease-in-out;
  z-index: 0;
`;

const ToggleButton = styled.button`
  flex: 1;
  height: 38px;
  border: none;
  border-radius: 100px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : "transparent"};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.sub16SB.fontFamily};
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 1;
`;

const ListWrapper = styled.div`
  position: absolute;
  margin-top: 85px;
  width: 288px;
  display: flex;
  flex-direction: column;
`;

const HighlightCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.ivory1};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.brown3};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckIcon = styled.div`
  width: 89px;
  height: 38px;
  padding: 8px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.brown3};
  color: ${({ theme }) => theme.colors.brown3};
  font-family: ${({ theme }) => theme.fonts.c14M};
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FireWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FireIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const StreakText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.s16SB};
`;

const PointText = styled.div`
  font-family: ${({ theme }) => theme.fonts.t20SB};
  color: ${({ theme }) => theme.colors.green};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BonusText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sub14SB};
  color: ${({ theme }) => theme.colors.error};
  margin-left: 4px;
`;

const MissionWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const MissionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.ivory3};
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  padding: 6px 20px;
  border-radius: 8px;
  height: 52px;
  font-family: ${({ theme }) => theme.fonts.b16M};
  color: ${({ theme }) => theme.colors.primary};
`;

const Point = styled.span`
  color: ${({ red, theme }) => (red ? theme.colors.error : theme.colors.green)};
  font-family: ${({ theme }) => theme.fonts.t20SB};
`;

const AnimatedWrapper = styled.div`
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;
